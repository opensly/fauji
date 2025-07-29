import colors from 'colors/safe.js';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { Worker } from 'worker_threads';
import { Logger } from '../logger/logger-core.js';

// Constants for file size limits
const LARGE_FILE_THRESHOLD = 50 * 1024; // 50KB
const HUGE_FILE_THRESHOLD = 200 * 1024; // 200KB

export async function runTestFiles(testFiles, options = {}) {
  const globalStartTime = Date.now();
  if (!testFiles.length) {
    console.log(colors.yellow('No test scripts found.'));
    process.exit(0);
  }
  
  // Pre-process files to detect large ones
  const processedFiles = testFiles.map(file => {
    try {
      const stats = fs.statSync(file);
      return {
        path: file,
        size: stats.size,
        isLarge: stats.size > (options.maxFileSize || LARGE_FILE_THRESHOLD),
        isHuge: stats.size > HUGE_FILE_THRESHOLD
      };
    } catch (error) {
      return { path: file, size: 0, isLarge: false, isHuge: false };
    }
  });

  // Replace restrictive strategies with optimization strategies
  const optimizationStrategy = options.optimizationStrategy || 'auto';
  const largeFiles = processedFiles.filter(f => f.isLarge);

  if (largeFiles.length > 0) {
    console.log(colors.blue(`\n🚀 Optimizing ${largeFiles.length} large test file(s) for better performance:`));
    largeFiles.forEach(file => {
      const sizeKB = Math.round(file.size / 1024);
      console.log(colors.blue(`   - ${file.path} (${sizeKB}KB) - applying optimizations`));
    });
    console.log(colors.blue('   Large files will run with enhanced memory management and timeouts.\n'));
  }
  
  const maxWorkers = typeof options.parallel === 'number' ? options.parallel : os.cpus().length;
  let completed = 0;
  let running = 0;
  let idx = 0;
  const results = [];
  const allTestResults = [];
  const bufferedOutput = []; // Buffer to store all worker output
  let finished = false;
  let hasFailures = false;

  console.log(colors.bold(`\n🚀 Running ${testFiles.length} test file(s) with ${maxWorkers} worker(s)...\n`));

  return new Promise((resolve) => {
    function runNext() {
      if (idx >= processedFiles.length) return;
      const fileInfo = processedFiles[idx++];
      const file = fileInfo.path;
      running++;
      const env = { ...process.env };
      if (options.report) env.FAUJI_REPORT = options.report;
      
      // Add file size info to environment for worker
      env.FAUJI_FILE_SIZE = fileInfo.size.toString();
      env.FAUJI_IS_LARGE_FILE = fileInfo.isLarge.toString();
      
      // Determine the correct extension for the worker file
      const currentExt = import.meta.url.split('.').pop();
      const workerExt = currentExt === 'cjs' ? '.cjs' : '.mjs';
      const worker = new Worker(new URL(`./worker-thread${workerExt}`, import.meta.url), {
        workerData: { testFile: file, env, options }
      });
      
      worker.on('message', (msg) => {
        if (finished) return;
        if (msg.type === 'result') {
          // Track failures properly
          if (msg.error || (msg.testResults && msg.testResults.stats && msg.testResults.stats.failed > 0)) {
            hasFailures = true;
          }
          
          // Aggregate test results from all workers
          if (msg.testResults && msg.testResults.tests) {
            allTestResults.push(...msg.testResults.tests);
          }
          
          // Buffer captured output instead of displaying immediately
          if (msg.stdout) {
            const cleanOutput = msg.stdout.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            bufferedOutput.push({ type: 'stdout', content: cleanOutput, file });
          }
          if (msg.stderr) {
            const cleanError = msg.stderr.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            bufferedOutput.push({ type: 'stderr', content: cleanError, file });
          }
          
          completed++;
          running--;
          results.push({ file, error: msg.error, testResults: msg.testResults });

          if (completed === testFiles.length && !finished) {
            finished = true;
            
            // Display all buffered output first
            for (const output of bufferedOutput) {
              if (output.type === 'stdout') {
                process.stdout.write(output.content);
              } else if (output.type === 'stderr') {
                process.stderr.write(output.content);
              }
            }
            
            // Create a consolidated logger with all results
            const consolidatedLogger = new Logger();
            consolidatedLogger.startTime = globalStartTime;
            consolidatedLogger.endTime = Date.now();
            
            // Aggregate all test results properly
            let totalPassed = 0;
            let totalFailed = 0;
            let totalSkipped = 0;
            let totalTests = 0;
            let passedSuites = 0;
            let failedSuites = 0;
            let skippedSuites = 0;
            
            for (const result of results) {
              if (result.testResults && result.testResults.stats) {
                const stats = result.testResults.stats;
                totalPassed += stats.passed || 0;
                totalFailed += stats.failed || 0;
                totalSkipped += stats.skipped || 0;
                totalTests += stats.total || 0;
                
                // Count suites: each test file is a suite
                if (stats.failed > 0) {
                  failedSuites++;
                } else if (stats.skipped > 0 && stats.passed === 0 && stats.failed === 0) {
                  skippedSuites++;
                } else {
                  passedSuites++;
                }
              }
            }
            
            // Set the aggregated stats
            consolidatedLogger.passed = totalPassed;
            consolidatedLogger.failed = totalFailed;
            consolidatedLogger.skipped = totalSkipped;
            consolidatedLogger.total = totalTests;
            consolidatedLogger.testResults = allTestResults.map(test => ({
              ...test,
              error: test.error && (test.error.actual !== undefined || test.error.expected !== undefined)
                ? test.error
                : null
            }));
            
            // Store suite counts for summary
            consolidatedLogger.passedSuites = passedSuites;
            consolidatedLogger.failedSuites = failedSuites;
            consolidatedLogger.skippedSuites = skippedSuites;
            consolidatedLogger.totalSuites = testFiles.length;
            
            // Display final summary at the very end
            if (allTestResults.length > 0) {
              consolidatedLogger.printSummary();
              
              // Show appropriate final message
              if (totalFailed > 0) {
                console.log(colors.red(`\n❌ ${totalFailed} test(s) failed across ${testFiles.length} file(s).`));
                process.exit(1);
              } else {
                console.log(colors.green(`\n✅ All ${totalTests} test(s) passed across ${testFiles.length} file(s).`));
                process.exit(0);
              }
            } else {
              console.log(colors.yellow('\n⚠️  No tests were executed.'));
              process.exit(0);
            }
            
            resolve(results);
          } else {
            runNext();
          }
        }
      });
      
      worker.on('error', (err) => {
        if (finished) return;
        
        // Check if this is a large file that failed
        const fileInfo = processedFiles.find(f => f.path === file);
        const isLargeFile = fileInfo && fileInfo.isLarge;
        
        let errorMsg;
        if (isLargeFile && err.message.includes('Bad Request')) {
          errorMsg = colors.red(`❌ Large test file failed: ${file}\n   Error: ${err.message}\n   Recommendation: Split this file into smaller test files.\n`);
        } else {
          errorMsg = colors.red(`❌ Worker thread error for file ${file}: ${err.message}\n`);
        }
        
        bufferedOutput.push({ type: 'stderr', content: errorMsg, file });
        hasFailures = true;
        completed++;
        running--;
        results.push({ file, error: err.message });
        
        if (completed === processedFiles.length && !finished) {
          finished = true;
          const finalErrorMsg = colors.red('\n❌ Test execution failed due to worker errors.\n');
          bufferedOutput.push({ type: 'stderr', content: finalErrorMsg, file: 'system' });
          
          // Display all buffered output first
          for (const output of bufferedOutput) {
            if (output.type === 'stdout') {
              process.stdout.write(output.content);
            } else if (output.type === 'stderr') {
              process.stderr.write(output.content);
            }
          }
          
          process.exit(1);
        } else {
          runNext();
        }
      });
      
      worker.on('exit', (code) => {
        if (finished) return;
        if (code !== 0) {
          const exitMsg = colors.red(`❌ Worker stopped with exit code ${code}\n`);
          bufferedOutput.push({ type: 'stderr', content: exitMsg, file });
          hasFailures = true;
        }
        // Ensure worker is properly terminated
        try {
          worker.terminate();
        } catch (e) {
          // Ignore termination errors
        }
      });
    }
    
    // Start initial workers
    for (let i = 0; i < Math.min(maxWorkers, testFiles.length); i++) {
      runNext();
    }
  });
}
