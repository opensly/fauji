// Hook registration for Fauji
const { getCurrentSuite } = require('./suite');
const fakeTimers = require('./fake-timers');
const spy = require('../matchers/spy');

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
getCurrentSuite().hooks.afterEach.push(function() {
  if (typeof fakeTimers.resetTimers === 'function') fakeTimers.resetTimers();
  if (typeof spy.resetAllMocks === 'function') spy.resetAllMocks();
});

module.exports = {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
}; 