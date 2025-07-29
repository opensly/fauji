import { parentPort, workerData } from 'worker_threads';
import * as colors from 'colors/safe.js';
import { Writable } from 'stream';
const { testFile, env, options } = workerData;

// Set environment variables
if (env) {
  Object.assign(process.env, env);
}

// Enhanced large file handling with optimizations
const isLargeFile = process.env.FAUJI_IS_LARGE_FILE === 'true';
const fileSize = parseInt(process.env.FAUJI_FILE_SIZE || '0', 10);

if (isLargeFile) {
  console.log(colors.blue(`🔧 Applying optimizations for large file (${Math.round(fileSize / 1024)}KB)`));
  
  // Enhanced memory management
  if (global.gc) {
    global.gc();
  }
  
  // Adaptive timeout based on file size
  const baseTimeout = 30000; // 30 seconds
  const sizeMultiplier = Math.max(1, fileSize / (50 * 1024)); // Scale with size
  const adaptiveTimeout = Math.min(baseTimeout * sizeMultiplier, 120000); // Max 2 minutes
  
  const timeout = setTimeout(() => {
    console.error(colors.red(`⏰ Large file execution timeout after ${adaptiveTimeout/1000}s`));
    console.error(colors.yellow('💡 Consider splitting the file or increasing timeout'));
    process.exit(1);
  }, adaptiveTimeout);
  
  process.on('exit', () => clearTimeout(timeout));
  
  // Enhanced error recovery
  process.on('uncaughtException', (err) => {
    if (err.message.includes('Bad Request') || err.message.includes('memory')) {
      console.error(colors.red(`💥 Large file execution error: ${err.message}`));
      console.error(colors.yellow('💡 This might be due to file complexity. Consider:'));
      console.error(colors.yellow('   1. Splitting the test file into smaller files'));
      console.error(colors.yellow('   2. Reducing the number of test cases per file'));
      console.error(colors.yellow('   3. Using --optimization-strategy=memory for enhanced memory management'));
    }
    process.exit(1);
  });
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
    // Setup JSDOM environment if needed (before setting up globals)
    if (options && options.env === 'jsdom') {
      const { setupJsdomIfNeeded } = await import(new URL('./env-setup.js', import.meta.url));
      setupJsdomIfNeeded(options);
    }
    
    // Import setup-globals to initialize the test environment
    const setupGlobals = (await import(new URL('./setup-globals.js', import.meta.url))).default;
    setupGlobals();
    
    // Import spy module and spy matchers properly to ensure all functions are available
    try {
      const spyModule = await import(new URL('../matchers/spy.js', import.meta.url));
      const spyMatchers = await import(new URL('../matchers/spyMatchers.js', import.meta.url));
      
      if (spyModule.createSpy && !global.createSpy) {
        global.createSpy = spyModule.createSpy;
      }
      if (spyModule.fn && !global.fn) {
        global.fn = spyModule.fn;
      }
      if (spyModule.spyOn && !global.spyOn) {
        global.spyOn = spyModule.spyOn;
      }
      if (spyModule.mock && !global.mock) {
        global.mock = spyModule.mock;
      }
      if (spyModule.unmock && !global.unmock) {
        global.unmock = spyModule.unmock;
      }
      if (spyModule.resetAllMocks && !global.resetAllMocks) {
        global.resetAllMocks = spyModule.resetAllMocks;
      }
      if (spyModule.requireActual && !global.requireActual) {
        global.requireActual = spyModule.requireActual;
      }
      if (spyModule.requireMock && !global.requireMock) {
        global.requireMock = spyModule.requireMock;
      }
      if (spyModule.createSpy && !global.spy) {
        global.spy = spyModule.createSpy;
      }
      if (spyModule.isMockFunction && !global.isMockFunction) {
        global.isMockFunction = spyModule.isMockFunction;
      }
      if (spyModule.isSpy && !global.isSpy) {
        global.isSpy = spyModule.isSpy;
      }
      if (spyMatchers && !global._spyMatchersAdded) {
        const { allMatchers } = await import(new URL('../matchers/index.js', import.meta.url));
        global._spyMatchersAdded = true;
      }
    } catch (importError) {
      console.error('Failed to import spy module:', importError.message);
    }
    
    const { rootSuite, setCurrentSuite } = await import(new URL('./suite.js', import.meta.url));
    setCurrentSuite(rootSuite);
    
    const { Logger } = await import(new URL('../logger/logger-core.js', import.meta.url));
    const workerLogger = new Logger({ stdout: bufferStdout, stderr: bufferStderr });
    global._testLogger = workerLogger;
    
    await import(new URL(testFile, `file://${process.cwd()}/`).href);

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

  await new Promise(resolve => setImmediate(resolve));

  capturedStdout = bufferStdout.toString();
  capturedStderr = bufferStderr.toString();

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
