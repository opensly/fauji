import colors from 'colors/safe';
import os from 'os';
import path from 'path';
import { Worker } from 'worker_threads';
import { Logger } from './logger.js';

export async function runTestFiles(testFiles, options = {}) {
  const globalStartTime = Date.now();
  if (!testFiles.length) {
    console.log(colors.yellow('No test scripts found.'));
    process.exit(0);
  }
  
  const maxWorkers = typeof options.parallel === 'number' ? options.parallel : os.cpus().length;
  let completed = 0;
  let running = 0;
  let idx = 0;
  const results = [];
  const allTestResults = [];
  let finished = false;
  let hasFailures = false;

  console.log(colors.bold(`\n🚀 Running ${testFiles.length} test file(s) with ${maxWorkers} worker(s)...\n`));

  return new Promise((resolve) => {
    function runNext() {
      if (idx >= testFiles.length) return;
      const file = testFiles[idx++];
      running++;
      const env = { ...process.env };
      if (options.report) env.FAUJI_REPORT = options.report;
      
      // Determine the correct extension for the worker file
      const currentExt = import.meta.url.split('.').pop();
      const workerExt = currentExt === 'cjs' ? '.cjs' : '.mjs';
      const worker = new Worker(new URL(`./worker-thread${workerExt}`, import.meta.url), {
        workerData: { testFile: file, env }
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
          
          // Display captured output from the worker thread with proper synchronization
          if (msg.stdout) {
            // Ensure proper line breaks and flush the output
            const cleanOutput = msg.stdout.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            process.stdout.write(cleanOutput);
            // Force flush to prevent concatenation with completion message
            process.stdout.write('');
          }
          if (msg.stderr) {
            const cleanError = msg.stderr.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            process.stderr.write(cleanError);
            process.stderr.write('');
          }
          
          completed++;
          running--;
          results.push({ file, error: msg.error, testResults: msg.testResults });

          if (completed === testFiles.length && !finished) {
            finished = true;
            
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
            consolidatedLogger.testResults = allTestResults;
            
            // Store suite counts for summary
            consolidatedLogger.passedSuites = passedSuites;
            consolidatedLogger.failedSuites = failedSuites;
            consolidatedLogger.skippedSuites = skippedSuites;
            consolidatedLogger.totalSuites = testFiles.length;
            
            // Only show summary if we have test results
            if (allTestResults.length > 0) {
              consolidatedLogger.printSummary();
              
              // Show appropriate final message
              if (hasFailures || totalFailed > 0) {
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
        console.log(colors.red(`❌ Worker thread error for file ${file}: ${err.message}`));
        hasFailures = true;
        completed++;
        running--;
        results.push({ file, error: err.message });
        
        if (completed === testFiles.length && !finished) {
          finished = true;
          console.log(colors.red('\n❌ Test execution failed due to worker errors.'));
          process.exit(1);
        } else {
          runNext();
        }
      });
      
      worker.on('exit', (code) => {
        if (finished) return;
        if (code !== 0) {
          console.log(colors.red(`❌ Worker stopped with exit code ${code}`));
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
