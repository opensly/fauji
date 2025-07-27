// Hook registration for Fauji
import { rootSuite, getCurrentSuite } from './suite.js';
import * as fakeTimers from './fake-timers.js';
import * as spy from '../matchers/spy.js';

function beforeAll(fn) {
  getCurrentSuite().hooks.beforeAll.push(fn);
}
function afterAll(fn) {
  getCurrentSuite().hooks.afterAll.push(fn);
}
function beforeEach(fn) {
  getCurrentSuite().hooks.beforeEach.push(fn);
}
function afterEach(fn) {
  getCurrentSuite().hooks.afterEach.push(fn);
}

// Instead of patching afterEach recursively, add a global afterEach that always resets timers
rootSuite.hooks.afterEach.push(function() {
  if (typeof fakeTimers.resetTimers === 'function') fakeTimers.resetTimers();
  // Use global.resetAllMocks directly instead of importing from spy module
  if (typeof global.resetAllMocks === 'function') {
    global.resetAllMocks();
  }
});

// Add aggressive registry clearing to ensure complete isolation
import { forceClearAllRegistries } from '../matchers/workerIsolatedRegistry.js';

// Add a global beforeAll that forces complete registry reset
rootSuite.hooks.beforeAll.push(function() {
  // Force clear all registries at the start of each test suite
  forceClearAllRegistries();
});

// Add a global afterAll that forces complete registry reset
rootSuite.hooks.afterAll.push(function() {
  // Force clear all registries at the end of each test suite
  forceClearAllRegistries();
});

// Add beforeEach to clear registries for each test
rootSuite.hooks.beforeEach.push(function() {
  // Clear registries at the start of each test to ensure isolation
  forceClearAllRegistries();
});

export { beforeAll, afterAll, beforeEach, afterEach }; 
