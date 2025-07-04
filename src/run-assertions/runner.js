// import dependencies
const _colors = require('colors/safe');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

function findTestFiles({ dir, pattern, name }) {
  let testFiles = [];
  function getFilesOfDir(currentDir) {
    fs.readdirSync(currentDir).forEach(item => {
      const fullPath = path.join(currentDir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        getFilesOfDir(fullPath);
      } else if (
        (!pattern || item.includes(pattern)) &&
        (!name || item.includes(name))
      ) {
        testFiles.push(fullPath);
      }
    });
  }
  getFilesOfDir(dir);
  return testFiles;
}

function runTestFiles(testFiles) {
  if (testFiles.length > 0) {
    testFiles.forEach(file => {
      const subprocess = childProcess.execFile('node', [require.resolve('./setup-globals.js'), file], (error, stdout, stderr) => {
        console.log(_colors.blue('\nTest result of ' + file));
        if (error) {
          console.log(_colors.red('Test failed: ' + error.message));
        }
        if (stdout) {
          process.stdout.write(_colors.green(stdout));
        }
        if (stderr) {
          process.stderr.write(_colors.red(stderr));
        }
      });
    });
  } else {
    console.log(_colors.yellow('No test scripts found.'));
  }
}

function watchAndRun({ dir, pattern, name }) {
  console.log(_colors.cyan('Watch mode enabled. Watching for file changes...'));
  runAll();
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename && (!pattern || filename.includes(pattern))) {
      console.log(_colors.magenta(`\nFile changed: ${filename}. Re-running tests...`));
      runAll();
    }
  });
  function runAll() {
    const testFiles = findTestFiles({ dir, pattern, name });
    runTestFiles(testFiles);
  }
}

function main(options = {}) {
  const dir = options.dir || process.cwd();
  const pattern = options.pattern || 'test.js';
  const name = options.name || '';
  const watch = options.watch || false;

  if (watch) {
    watchAndRun({ dir, pattern, name });
  } else {
    const testFiles = findTestFiles({ dir, pattern, name });
    runTestFiles(testFiles);
  }
}

module.exports = main;
