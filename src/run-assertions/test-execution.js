import colors from 'colors/safe';
import os from 'os';
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
  let failed = 0;
  let running = 0;
  let idx = 0;
  const results = [];
  const allTestResults = [];
  let finished = false;

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
          // Aggregate test results from all workers
          if (msg.testResults) allTestResults.push(msg.testResults);
          if (msg.error) {
            failed++;
          }
          completed++;
          running--;
          results.push({ file, error: msg.error });

          if (completed === testFiles.length && !finished) {
            finished = true;
            const logger = new Logger();
            logger.startTime = globalStartTime;
            logger.endTime = Date.now();
            
            // Aggregate test results
            for (const tr of allTestResults) {
              if (tr && tr.tests) {
                logger.testResults.push(...tr.tests);
                logger.passed += tr.stats.passed;
                logger.failed += tr.stats.failed;
                logger.skipped += tr.stats.skipped;
                logger.total += tr.stats.total;
              }
            }
            
            // Print summary only if we have results - FIX: Check array length, not .total property
            if (logger.testResults.length > 0) {
              logger.printSummary();
              if (failed > 0) {
                console.log(colors.red(`\n${failed} test file(s) failed.`));
              } else {
                console.log(colors.green('\nAll test files passed.'));
              }
            } else {
              console.log(colors.yellow('No test results to display.'));
            }
            resolve(results);
            process.exit(failed > 0 ? 1 : 0);
          } else {
            runNext();
          }
        }
      });
      worker.on('error', (err) => {
        if (finished) return;
        console.log(colors.red('Worker thread error: ' + err.message));
        failed++;
        completed++;
        running--;
        results.push({ file, error: err.message });
        if (completed === testFiles.length && !finished) {
          finished = true;
          resolve(results);
        } else {
          runNext();
        }
      });
      worker.on('exit', (code) => {
        if (finished) return;
        if (code !== 0) {
          console.log(colors.red(`Worker stopped with exit code ${code}`));
        }
      });
    }
    for (let i = 0; i < Math.min(maxWorkers, testFiles.length); i++) {
      runNext();
    }
  });
}
