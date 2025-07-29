import { rootSuite, getCurrentSuite } from './suite.js';
import * as fakeTimers from './fake-timers.js';
import { forceClearAllRegistries } from '../matchers/workerIsolatedRegistry.js';


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

// Global afterEach that always resets timers
rootSuite.hooks.afterEach.push(function() {
  if (typeof fakeTimers.resetTimers === 'function') fakeTimers.resetTimers();
  if (typeof global.resetAllMocks === 'function') {
    global.resetAllMocks();
  }
});

// Global beforeAll that forces complete registry reset
rootSuite.hooks.beforeAll.push(function() {
  forceClearAllRegistries();
});

// Global afterAll that forces complete registry reset
rootSuite.hooks.afterAll.push(function() {
  forceClearAllRegistries();
});

// beforeEach to clear registries for each test
rootSuite.hooks.beforeEach.push(function() {
  forceClearAllRegistries();
});

export { beforeAll, afterAll, beforeEach, afterEach }; 
