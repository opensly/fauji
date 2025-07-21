// Hook registration for Fauji
import { rootSuite } from './suite.js';
import * as fakeTimers from './fake-timers';
import * as spy from '../matchers/spy';

function beforeAll(fn) {
  rootSuite.hooks.beforeAll.push(fn);
}
function afterAll(fn) {
  rootSuite.hooks.afterAll.push(fn);
}
function beforeEach(fn) {
  rootSuite.hooks.beforeEach.push(fn);
}
function afterEach(fn) {
  rootSuite.hooks.afterEach.push(fn);
}

// Instead of patching afterEach recursively, add a global afterEach that always resets timers
rootSuite.hooks.afterEach.push(function() {
  if (typeof fakeTimers.resetTimers === 'function') fakeTimers.resetTimers();
  if (typeof spy.resetAllMocks === 'function') spy.resetAllMocks();
});

export { beforeAll, afterAll, beforeEach, afterEach }; 