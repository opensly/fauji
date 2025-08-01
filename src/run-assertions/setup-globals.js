import { describe, test } from './registration.js';
import { beforeAll, afterAll, beforeEach, afterEach } from './hooks.js';
import { run } from './runner-core.js';
import * as matchers from '../matchers/index.js';
import * as fakeTimers from './fake-timers.js';
import { spy, fn, spyOn, mock, unmock, resetAllMocks, requireActual, requireMock, createSpy, mockReturnValue, mockImplementation, mockResolvedValue, mockRejectedValue, isMockFunction, isSpy } from '../matchers/spy.js';
import { enhancedExpect } from './enhanced-expect.js';


function setupGlobals() {
  global.describe = describe;
  global.test = test;
  global.beforeAll = beforeAll;
  global.afterAll = afterAll;
  global.beforeEach = beforeEach;
  global.afterEach = afterEach;
  global.expect = (received) => {
    return enhancedExpect(received);
  };
  global.run = run;
  global.addMatchers = matchers.addMatchers;
  global.describe.only = describe.only;
  global.describe.skip = describe.skip;
  global.test.only = test.only;
  global.test.skip = test.skip;
  global.useFakeTimers = fakeTimers.useFakeTimers;
  global.useRealTimers = fakeTimers.useRealTimers;
  global.advanceTimersByTime = fakeTimers.advanceTimersByTime;
  global.runAllTimers = fakeTimers.runAllTimers;
  global.resetTimers = fakeTimers.resetTimers;
  global.fn = fn;
  global.spy = fn; // Alias spy to fn as expected by tests
  global.createSpy = createSpy; // Also expose createSpy directly
  global.spyOn = spyOn;
  global.mock = mock;
  global.unmock = unmock;
  global.resetAllMocks = resetAllMocks;
  global.requireActual = requireActual;
  global.requireMock = requireMock;
  global.mockReturnValue = mockReturnValue;
  global.mockImplementation = mockImplementation;
  global.mockResolvedValue = mockResolvedValue;
  global.mockRejectedValue = mockRejectedValue;
  global.isMockFunction = isMockFunction;
  global.isSpy = isSpy;

  global.getTimerCalls = fakeTimers.getTimerCalls;
  global.getTimerCallCount = fakeTimers.getTimerCallCount;
}

export default setupGlobals;

// Always set up globals when imported
if (typeof global !== 'undefined') {
  setupGlobals();
}

// --- Fauji CLI auto-run support ---
async function cliAutoRun() {
  if (process.argv[1] && process.argv[1].endsWith('setup-globals.js') && process.argv[2]) {
    setupGlobals();
    console.log('setupGlobals called, test global is:', typeof global.test);
    const testFile = process.argv[2];
    await import(new URL(testFile, `file://${process.cwd()}/`).href);
    run();
  }
}
// Only run cliAutoRun if this file is the main entry point (not when imported as a module)
if (
  typeof process !== 'undefined' &&
  process.argv &&
  import.meta && import.meta.url &&
  process.argv[1] &&
  import.meta.url === 'file://' + process.argv[1]
) {
  cliAutoRun();
}
