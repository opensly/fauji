import { parentPort, workerData } from 'worker_threads';
import * as colors from 'colors/safe';
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
    
    // Import the test file
    await import(new URL(testFile, `file://${process.cwd()}/`).href);

    // Run the tests if the run function is available
    if (typeof global.run === 'function') {
      global.run();
    }
    
    // Create isolated logger for this worker thread
    const { Logger } = await import(new URL('./logger.js', import.meta.url));
    const workerLogger = new Logger();
    
    // Access the logger instance correctly
    // The logger should be available via runner-core.js export
    const runnerCore = await import(new URL('./runner-core.js', import.meta.url));
    
    // Get test results from the global logger if available
    if (runnerCore && runnerCore._log) {
      const logger = runnerCore._log;
      if (!logger.endTime && logger.startTime) {
        logger.endTimer();
      }
      testResults = logger.getResultsJSON();
    } else {
      // Fallback: try to get results from global scope
      if (global._testLogger instanceof Logger) {
        if (!global._testLogger.endTime && global._testLogger.startTime) {
          global._testLogger.endTimer();
        }
        testResults = global._testLogger.getResultsJSON();
      }
    }
    
    const endTime = Date.now();
    
    // Ensure timing information is properly set
    if (testResults) {
      testResults.startTime = startTime;
      testResults.endTime = endTime;
      testResults.duration = endTime - startTime;

      // Ensure individual test durations are properly calculated
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

  // Ensure all output is flushed before sending results
  await new Promise(resolve => {
    process.stdout.write('', resolve);
  });
  await new Promise(resolve => {
    process.stderr.write('', resolve);
  });
  
  // Additional flush to ensure all output is captured
  process.stdout.write('');
  process.stderr.write('');

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
