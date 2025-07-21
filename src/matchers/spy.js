// Provides spy, stub, and mock utilities for use in tests and matchers.
import { builtinModules } from 'module';

// --- Spy Implementation ---
export function createSpy(fn) {
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
export const spy = createSpy;
export function isSpy(fn) { return fn && fn.isSpy; }

// --- Stub Implementation ---
export function createStub(obj, methodName, impl) {
  if (!obj || typeof obj[methodName] !== 'function') throw new Error('No such method to stub');
  const original = obj[methodName];
  const spy = createSpy(impl);
  obj[methodName] = spy;
  spy.restore = () => { obj[methodName] = original; };
  return spy;
}
export const stub = createStub;

// --- Mock Implementation ---
export function createMock(modulePath, mockImpl) {
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

export function fn(impl) {
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

export function spyOn(obj, methodName) {
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

const builtins = builtinModules || [];
function isBuiltinModule(modulePath) {
  // Accept both 'fs' and 'node:fs' forms
  return builtins.includes(modulePath) || builtins.includes(modulePath.replace(/^node:/, ''));
}

export async function mock(modulePath, mockImpl) {
  let resolved;
  if (isBuiltinModule(modulePath)) {
    resolved = modulePath;
    if (!_originalModules.has(resolved)) {
      _originalModules.set(resolved, (await import(modulePath)).default ?? (await import(modulePath)));
    }
    require.cache[resolved] = { exports: mockImpl };
    _mockedModules.set(resolved, mockImpl);
    return { restore: () => unmock(modulePath) };
  } else {
    resolved = require.resolve(modulePath);
  }
  if (!_originalModules.has(resolved)) {
    _originalModules.set(resolved, (await import(resolved)).default ?? (await import(resolved)));
  }
  let mockExports;
  if (mockImpl === undefined) {
    const manualMockPath = findManualMock(resolved);
    if (manualMockPath) {
      mockExports = (await import(manualMockPath)).default ?? (await import(manualMockPath));
    } else {
      const realExports = (await import(resolved)).default ?? (await import(resolved));
      mockExports = autoMockExports(realExports);
    }
  } else if (typeof mockImpl === 'object' && !Array.isArray(mockImpl)) {
    const realExports = (await import(resolved)).default ?? (await import(resolved));
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

export function unmock(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    require.cache[resolved] = _originalModules.get(resolved);
    _mockedModules.delete(resolved);
    _originalModules.delete(resolved);
  }
}

export function resetAllMocks() {
  for (const resolved of _mockedModules.keys()) {
    if (_originalModules.has(resolved)) {
      require.cache[resolved] = _originalModules.get(resolved);
    }
  }
  _mockedModules.clear();
  _originalModules.clear();
}

export async function requireActual(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    return _originalModules.get(resolved).exports;
  }
  return (await import(resolved)).default ?? (await import(resolved));
}

export async function requireMock(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_mockedModules.has(resolved)) {
    return _mockedModules.get(resolved);
  }
  return (await import(resolved)).default ?? (await import(resolved));
} 