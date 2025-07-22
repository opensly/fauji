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
  const startTime = Date.now();
  try {
    await import(new URL('./setup-globals.js', import.meta.url));
    await import(new URL(testFile, `file://${process.cwd()}/`).href);

    if (typeof global.run === 'function') {
      global.run();
    }
    
    if (global._log && typeof global._log.getResultsJSON === 'function') {
      // FIX: Call endTimer before getting results to ensure duration is calculated
      global._log.endTimer();
      
      testResults = global._log.getResultsJSON();
      const endTime = Date.now();
      
      // Set the timing info
      testResults.startTime = startTime;
      testResults.endTime = endTime;
      testResults.duration = endTime - startTime;

      // FIX: Ensure individual test durations are properly calculated
      if (testResults.tests) {
        testResults.tests = testResults.tests.map(test => ({
          ...test,
          // Use existing duration if available, otherwise calculate from start/end times
          duration: test.duration || (test.endTime && test.startTime ? test.endTime - test.startTime : 0)
        }));
      }
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
