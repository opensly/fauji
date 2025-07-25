import { parentPort, workerData } from 'worker_threads';
import * as colors from 'colors/safe';
import { Writable } from 'stream';
const { testFile, env } = workerData;

// Set environment variables
if (env) {
  Object.assign(process.env, env);
}

// BufferStream to capture output
class BufferStream extends Writable {
  constructor() {
    super();
    this.chunks = [];
  }
  _write(chunk, encoding, callback) {
    this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    callback();
  }
  toString() {
    return Buffer.concat(this.chunks).toString('utf8');
  }
}

let capturedStdout = '';
let capturedStderr = '';
const bufferStdout = new BufferStream();
const bufferStderr = new BufferStream();

const origStdoutWrite = process.stdout.write.bind(process.stdout);
const origStderrWrite = process.stderr.write.bind(process.stderr);

// Redirect process.stdout/stderr to buffer only (no terminal output)
process.stdout.write = bufferStdout.write.bind(bufferStdout);
process.stderr.write = bufferStderr.write.bind(bufferStderr);

// Ensure proper flushing
process.stdout.on('drain', () => {});
process.stderr.on('drain', () => {});

let error = null;
let testResults = null;

(async () => {
  const startTime = Date.now();
  try {
    // Import setup-globals to initialize the test environment
    await import(new URL('./setup-globals.js', import.meta.url));
    
    // Reset suite state for this worker to prevent state pollution
    const { rootSuite, setCurrentSuite } = await import(new URL('./suite.js', import.meta.url));
    setCurrentSuite(rootSuite);
    
    
    const { Logger } = await import(new URL('../logger/logger-core.js', import.meta.url));
    const workerLogger = new Logger({ stdout: bufferStdout, stderr: bufferStderr });
    global._testLogger = workerLogger;
    
    // Import the test file (which will register tests)
    await import(new URL(testFile, `file://${process.cwd()}/`).href);

    // Run the tests if the run function is available
    if (typeof global.run === 'function') {
      await global.run();
    }
    
    // Get test results from the logger we just set
    if (!workerLogger.endTime && workerLogger.startTime) {
      workerLogger.endTimer();
    }
    testResults = workerLogger.getResultsJSON();
    
    const endTime = Date.now();
    
    // Ensure timing information is properly set
    if (testResults) {
      testResults.startTime = startTime;
      testResults.endTime = endTime;
      testResults.duration = endTime - startTime;
      
      if (testResults.tests) {
        testResults.tests = testResults.tests.map(test => ({
          ...test,
          duration: test.duration || (test.endTime && test.startTime ? test.endTime - test.startTime : 0)
        }));
      }
    }
  } catch (e) {
    error = e.stack || e.message || String(e);
    console.error(colors.red('Error in test file execution:'), e);
  }

  // After test execution, before capturing output:
  // Allow any pending writes to flush
  await new Promise(resolve => setImmediate(resolve));

  capturedStdout = bufferStdout.toString();
  capturedStderr = bufferStderr.toString();

  // Clean up global state before sending results
  if (global._testLogger) {
    delete global._testLogger;
  }
  
  // Send results immediately instead of waiting for process exit
  parentPort.postMessage({
    type: 'result',
    stdout: capturedStdout,
    stderr: capturedStderr,
    error,
    code: error ? 1 : 0,
    testResults
  });
})();
