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

// --- Jest-like Mocking Enhancements ---
const _mockedModules = new Map();
const _originalModules = new Map();

function fn(impl) {
  const mockFn = function(...args) {
    mockFn.mock.calls.push(args);
    mockFn.mock.instances.push(this);
    let result, threw = false, error;
    try {
      result = impl ? impl.apply(this, args) : undefined;
    } catch (e) {
      threw = true;
      error = e;
      throw e;
    } finally {
      mockFn.mock.results.push({ type: threw ? 'throw' : 'return', value: threw ? error : result });
    }
    return result;
  };
  mockFn.mock = { calls: [], instances: [], results: [] };
  return mockFn;
}

function spyOn(obj, methodName) {
  if (!obj || typeof obj[methodName] !== 'function') throw new Error('No such method to spyOn');
  const original = obj[methodName];
  const spy = fn(original);
  obj[methodName] = spy;
  spy.restore = () => { obj[methodName] = original; };
  return spy;
}

function autoMockExports(exports) {
  const mocked = {};
  for (const key of Object.keys(exports)) {
    if (typeof exports[key] === 'function') {
      mocked[key] = fn();
    } else {
      mocked[key] = exports[key];
    }
  }
  return mocked;
}

const path = require('path');
const fs = require('fs');

function findManualMock(modulePath) {
  // Look for __mocks__ sibling to the module
  const dir = path.dirname(modulePath);
  const base = path.basename(modulePath, path.extname(modulePath));
  const mockPath = path.join(dir, '__mocks__', base + '.js');
  if (fs.existsSync(mockPath)) {
    return mockPath;
  }
  return null;
}

// --- Phase 3: Built-in module mocking and advanced call tracking ---
const builtins = require('module').builtinModules || [];

function isBuiltinModule(modulePath) {
  // Accept both 'fs' and 'node:fs' forms
  return builtins.includes(modulePath) || builtins.includes(modulePath.replace(/^node:/, ''));
}

function mock(modulePath, mockImpl) {
  let resolved;
  if (isBuiltinModule(modulePath)) {
    // For built-ins, use the module name as the key
    resolved = modulePath;
    if (!_originalModules.has(resolved)) {
      _originalModules.set(resolved, require(modulePath));
    }
    require.cache[resolved] = { exports: mockImpl };
    _mockedModules.set(resolved, mockImpl);
    return { restore: () => unmock(modulePath) };
  } else {
    resolved = require.resolve(modulePath);
  }
  if (!_originalModules.has(resolved)) {
    _originalModules.set(resolved, require.cache[resolved]);
  }
  let mockExports;
  if (mockImpl === undefined) {
    // Check for manual mock
    const manualMockPath = findManualMock(resolved);
    if (manualMockPath) {
      mockExports = require(manualMockPath);
    } else {
      // Auto-mock all exports
      const realExports = require(resolved);
      mockExports = autoMockExports(realExports);
    }
  } else if (typeof mockImpl === 'object' && !Array.isArray(mockImpl)) {
    // Allow mocking specific named exports
    const realExports = require(resolved);
    mockExports = { ...realExports, ...mockImpl };
    for (const key of Object.keys(mockImpl)) {
      if (typeof mockImpl[key] === 'function' && !mockImpl[key].mock) {
        mockExports[key] = fn(mockImpl[key]);
      }
    }
  } else {
    mockExports = mockImpl;
  }
  require.cache[resolved] = { ...require.cache[resolved], exports: mockExports };
  _mockedModules.set(resolved, mockExports);
  return {
    restore: () => unmock(modulePath)
  };
}

function unmock(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    require.cache[resolved] = _originalModules.get(resolved);
    _mockedModules.delete(resolved);
    _originalModules.delete(resolved);
  }
}

function resetAllMocks() {
  for (const resolved of _mockedModules.keys()) {
    if (_originalModules.has(resolved)) {
      require.cache[resolved] = _originalModules.get(resolved);
    }
  }
  _mockedModules.clear();
  _originalModules.clear();
}

function requireActual(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    return _originalModules.get(resolved).exports;
  }
  return require(resolved);
}

function requireMock(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_mockedModules.has(resolved)) {
    return _mockedModules.get(resolved);
  }
  return require(resolved);
}

module.exports = {
  createSpy,
  isSpy,
  createStub,
  createMock,
  spy: createSpy,
  stub: createStub,
  mock: mock,
  fn,
  spyOn,
  mock,
  unmock,
  resetAllMocks,
  requireActual,
  requireMock
}; 