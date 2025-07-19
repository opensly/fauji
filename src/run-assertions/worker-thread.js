const { parentPort, workerData } = require('worker_threads');
const { testFile, env } = workerData;

// Set environment variables
if (env) {
  Object.assign(process.env, env);
}

let capturedStdout = '';
let capturedStderr = '';

const origStdoutWrite = process.stdout.write.bind(process.stdout);
const origStderrWrite = process.stderr.write.bind(process.stderr);

process.stdout.write = (chunk, ...args) => {
  capturedStdout += chunk;
  return origStdoutWrite(chunk, ...args);
};
process.stderr.write = (chunk, ...args) => {
  capturedStderr += chunk;
  return origStderrWrite(chunk, ...args);
};

let error = null;

try {
  require(require.resolve('./setup-globals.js'));
  require(require('path').resolve(testFile));
  // The global run() should be called by setup-globals.js logic after requiring the test file
} catch (e) {
  error = e.stack || e.message || String(e);
}

// Wait for process exit to send results
process.on('exit', (code) => {
  parentPort.postMessage({
    type: 'result',
    stdout: capturedStdout,
    stderr: capturedStderr,
    error,
    code
  });
}); 