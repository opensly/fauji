import { parentPort, workerData } from 'worker_threads';
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
let testResults = null;

(async () => {
  try {
    await import(new URL('./setup-globals.js', import.meta.url));
    await import(new URL(testFile, `file://${process.cwd()}/`).href);
    // Automatically call run() if defined, to match Jest/Vitest
    if (typeof global.run === 'function') {
      global.run();
    }
    // After running, try to get results from the logger
    if (global._log && typeof global._log.getResultsJSON === 'function') {
      testResults = global._log.getResultsJSON();
    }
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
      code,
      testResults
    });
  });
})(); 