// import dependencies
const _colors = require('colors/safe');
const fs = require('../../node_modules/file-system');
const childProcess = require('child_process');

// import modules
const _config = require('../../watcher-config.json');

var testFiles = [];

getTestFiles = async () => {
  getFilesOfDir(_config.sourceDir);
}

getFilesOfDir = (dir) => {
  fs.readdirSync(dir).forEach(item => {
    if (fs.statSync(dir + '/' + item).isDirectory()) {
      getFilesOfDir(dir + '/' + item);
    } else if (item.includes('test.js')) {
      testFiles.push(dir + '/' + item);
    }
  });
}

runTestFiles = () => {
  if (testFiles.length > 0) {
    testFiles.forEach(file => {
      const subprocess = childProcess.execFile('node', [file], (error, stdout, stderr) => {
        console.log(_colors.blue('Test result of ' +file));
        if (error) {
          throw error;
        }
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
      });
    });
  } else {
    console.log('Test scripts does not exists');
  }
}


start = async () => {
  getTestFiles();
  await runTestFiles();
}

start();
