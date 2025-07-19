// Test execution for Fauji with worker pool
const _colors = require('colors/safe');
const childProcess = require('child_process');
const os = require('os');

async function runTestFiles(testFiles, options = {}) {
  if (!testFiles.length) {
    console.log(_colors.yellow('No test scripts found.'));
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
      const subprocess = childProcess.execFile('node', [require.resolve('./setup-globals.js'), file], { env }, (error, stdout, stderr) => {
        console.log(_colors.blue('\nTest result of ' + file));
        if (stdout) process.stdout.write(_colors.green(stdout));
        if (stderr) process.stderr.write(_colors.red(stderr));
        if (error) {
          console.log(_colors.red('Test failed: ' + error.message));
          failed++;
        }
        completed++;
        running--;
        results.push({ file, error });
        if (completed === testFiles.length) {
          if (options.report) {
            if (options.report === 'html') console.log(_colors.cyan('HTML report written to fauji-report.html'));
            if (options.report === 'json') console.log(_colors.cyan('HTML report written to fauji-report.json'));
          }
          if (failed > 0) {
            console.log(_colors.red(`\n${failed} test file(s) failed.`));
            process.exit(1);
          } else {
            console.log(_colors.green('\nAll test files passed.'));
            process.exit(0);
          }
          resolve(results);
        } else {
          runNext();
        }
      });
    }
    for (let i = 0; i < Math.min(maxWorkers, testFiles.length); i++) {
      runNext();
    }
  });
}

module.exports = {
  runTestFiles,
}; 