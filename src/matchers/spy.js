// Spy/Stub/Mock System for Fauji
// --------------------------------
// Provides spy, stub, and mock utilities for use in tests and matchers.

/**
 * @typedef {Function & { calls: any[][], callCount: number, isSpy: boolean, restore: () => void }} SpyFn
 */
/**
 * @param {Function=} fn
 * @returns {SpyFn}
 */
function createSpy(fn) {
  const spy = function(...args) {
    spy.calls.push(args);
    spy.callCount++;
    return fn ? fn.apply(this, args) : undefined;
  };
  spy.calls = [];
  spy.callCount = 0;
  spy.isSpy = true;
  spy.restore = () => {};
  return spy;
}
function isSpy(fn) { return fn && fn.isSpy; }

/**
 * @param {any} obj
 * @param {string} methodName
 * @param {Function=} impl
 * @returns {SpyFn}
 */
function createStub(obj, methodName, impl) {
  if (!obj || typeof obj[methodName] !== 'function') throw new Error('No such method to stub');
  const original = obj[methodName];
  const spy = createSpy(impl);
  obj[methodName] = spy;
  spy.restore = () => { obj[methodName] = original; };
  return spy;
}

/**
 * @param {string} modulePath
 * @param {any} mockImpl
 * @returns {{ restore: () => void }}
 */
function createMock(modulePath, mockImpl) {
  const resolved = require.resolve(modulePath);
  const original = require.cache[resolved];
  require.cache[resolved] = { ...original, exports: mockImpl };
  return {
    restore: () => { require.cache[resolved] = original; }
  };
}

module.exports = {
  createSpy,
  isSpy,
  createStub,
  createMock,
  spy: createSpy,
  stub: createStub,
  mock: createMock
}; 