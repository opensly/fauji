// Test execution for Fauji with worker pool
import colors from 'colors/safe';
import os from 'os';
import { Worker } from 'worker_threads';

export async function runTestFiles(testFiles, options = {}) {
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
        if (msg.type === 'result') {
          console.log(colors.blue('\nTest result of ' + file));
          if (msg.stdout) process.stdout.write(colors.green(msg.stdout));
          if (msg.stderr) process.stderr.write(colors.red(msg.stderr));
          if (msg.error) {
            console.log(colors.red('Test failed: ' + msg.error));
            failed++;
          }
          completed++;
          running--;
          results.push({ file, error: msg.error });
          if (completed === testFiles.length) {
            if (options.report) {
              if (options.report === 'html') console.log(colors.cyan('HTML report written to fauji-report.html'));
              if (options.report === 'json') console.log(colors.cyan('HTML report written to fauji-report.json'));
            }
            if (failed > 0) {
              console.log(colors.red(`\n${failed} test file(s) failed.`));
              process.exit(1);
            } else {
              console.log(colors.green('\nAll test files passed.'));
              process.exit(0);
            }
            resolve(results);
          } else {
            runNext();
          }
        }
      });
      worker.on('error', (err) => {
        console.log(colors.red('Worker thread error: ' + err.message));
        failed++;
        completed++;
        running--;
        results.push({ file, error: err.message });
        if (completed === testFiles.length) {
          resolve(results);
        } else {
          runNext();
        }
      });
      worker.on('exit', (code) => {
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