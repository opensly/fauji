const { describe, test } = require('./registration');
const { beforeAll, afterAll, beforeEach, afterEach } = require('./hooks');
const { expect, run } = require('./runner-core');
const fakeTimers = require('./fake-timers');
const spy = require('../matchers/spy');

global.describe = describe;
global.test = test;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.expect = expect;
global.describe.only = describe.only;
global.describe.skip = describe.skip;
global.test.only = test.only;
global.test.skip = test.skip;
global.useFakeTimers = fakeTimers.useFakeTimers;
global.useRealTimers = fakeTimers.useRealTimers;
global.advanceTimersByTime = fakeTimers.advanceTimersByTime;
global.runAllTimers = fakeTimers.runAllTimers;
global.resetTimers = fakeTimers.resetTimers;
global.fn = spy.fn;
global.spyOn = spy.spyOn;
global.mock = spy.mock;
global.unmock = spy.unmock;
global.resetAllMocks = spy.resetAllMocks;
global.requireActual = spy.requireActual;
global.requireMock = spy.requireMock;

// --- Fauji CLI auto-run support ---
if (require.main === module && process.argv[2]) {
  // If this file is run directly with a test file as argument (from CLI)
  const testFile = process.argv[2];
  require(require('path').resolve(testFile));
  run();
} 