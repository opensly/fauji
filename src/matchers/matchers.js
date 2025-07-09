// import dependencies
const util = require('util');

// import modules
const { Logger } = require('../run-assertions/logger');

const _log = new Logger();

// Import spy/stub/mock system
const { createSpy, isSpy, createStub, createMock, spy, stub, mock } = require('./spy');

// Deep equality check
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (const key of aKeys) {
    if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// Partial object match (isMatch)
function isMatch(obj, partial) {
  if (typeof obj !== 'object' || obj === null || typeof partial !== 'object' || partial === null) return false;
  for (const key of Object.keys(partial)) {
    if (!(key in obj) || !deepEqual(obj[key], partial[key])) return false;
  }
  return true;
}

// Get value by key path (e.g., 'a.b.c')
function getByPath(obj, path) {
  if (!Array.isArray(path)) path = String(path).split('.');
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

// Has key path
function hasByPath(obj, path) {
  if (!Array.isArray(path)) path = String(path).split('.');
  let cur = obj;
  for (const key of path) {
    if (cur == null || !(key in cur)) return false;
    cur = cur[key];
  }
  return true;
}

function formatDiff(received, expected) {
  // Simple diff for objects/arrays
  if (typeof received === 'object' && typeof expected === 'object') {
    return `\n  Received: ${util.inspect(received, { depth: 5, colors: false })}\n  Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
  }
  return '';
}

function getMatcherResult(result, matcherName, received, expected, isNot = false) {
  if (!result) {
    const notText = isNot ? 'not.' : '';
    // Try to get stack trace info for actionable output
    const err = new Error();
    const stackLines = (err.stack || '').split('\n');
    // Find the first stack line outside matchers.js
    let testFrame = stackLines.find(l => l.includes('.js') && !l.includes('matchers.js') && !l.includes('logger.js')) || stackLines[2] || '';
    // Extract file, line, column
    let location = '';
    const match = testFrame.match(/\(([^)]+)\)/) || testFrame.match(/at ([^ ]+)/);
    if (match && match[1]) {
      location = match[1];
    }
    let codeFrame = '';
    if (location) {
      // Try to read the file and show the code frame
      const [file, line, col] = location.split(/:|\//).slice(-3);
      try {
        const fs = require('fs');
        const lines = fs.readFileSync(location.split(':')[0], 'utf8').split('\n');
        const lineNum = parseInt(line, 10) - 1;
        const start = Math.max(0, lineNum - 2);
        const end = Math.min(lines.length, lineNum + 3);
        codeFrame = lines.slice(start, end).map((l, i) => {
          const n = start + i + 1;
          return (n === lineNum + 1 ? '> ' : '  ') + n.toString().padStart(3) + ' | ' + l;
        }).join('\n');
      } catch {}
    }
    let message = '';
    message += `\n${location ? 'at ' + location : ''}`;
    if (codeFrame) message += `\n${codeFrame}\n`;
    message += `\nDifference:`;
    if (typeof expected !== 'undefined') {
      message += `\n- Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
      message += `\n+ Received: ${util.inspect(received, { depth: 5, colors: false })}`;
    } else {
      message += `\n- Expected: ${notText}${matcherName}`;
      message += `\n+ Received: ${util.inspect(received, { depth: 5, colors: false })}`;
    }
    // Add diff for deep equality matchers
    if (["toEqual", "toMatchObject"].includes(matcherName) && typeof received === 'object' && typeof expected === 'object') {
      message += formatDiff(received, expected);
    }
    message += '\n';
    if (_log.error) {
      _log.error(message);
    } else {
      console.error(message);
    }
  } else {
    _log.status(result);
  }
  return result;
}

// --- Type Check Helpers ---
function isArray(val) { return Array.isArray(val); }
function isObject(val) { return val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date) && !(val instanceof RegExp); }
function isString(val) { return typeof val === 'string'; }
function isNumber(val) { return typeof val === 'number' && !isNaN(val); }
function isBoolean(val) { return typeof val === 'boolean'; }
function isFunction(val) { return typeof val === 'function'; }
function isDate(val) { return val instanceof Date; }
function isRegExp(val) { return val instanceof RegExp; }

// --- Content/Validation Helpers ---
function isEmpty(val) {
  if (val == null) return true;
  if (typeof val === 'string' || Array.isArray(val)) return val.length === 0;
  if (val instanceof Map || val instanceof Set) return val.size === 0;
  if (typeof val === 'object') return Object.keys(val).length === 0;
  return false;
}
function isValidJSON(val) {
  if (typeof val !== 'string') return false;
  try { JSON.parse(val); return true; } catch { return false; }
}
function isValidURL(val) {
  try { new URL(val); return true; } catch { return false; }
}
function isValidEmail(val) {
  return typeof val === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
}
function isValidUUID(val) {
  return typeof val === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
}


// --- Schema Validation (basic) ---
function matchSchema(obj, schema) {
  if (typeof schema !== 'object' || schema === null) return false;
  for (const key in schema) {
    if (!(key in obj)) return false;
    const type = schema[key];
    if (typeof type === 'string') {
      if (typeof obj[key] !== type) return false;
    } else if (typeof type === 'function') {
      if (!(obj[key] instanceof type)) return false;
    } else if (typeof type === 'object') {
      if (!matchSchema(obj[key], type)) return false;
    }
  }
  return true;
}

const baseMatchers = {
  toBe: (received, expected) => getMatcherResult(received === expected, 'toBe', received, expected),
  toEqual: (received, expected) => getMatcherResult(deepEqual(received, expected), 'toEqual', received, expected),
  toBeNull: (received) => getMatcherResult(received === null, 'toBeNull', received),
  toBeUndefined: (received) => getMatcherResult(received === undefined, 'toBeUndefined', received),
  toBeCloseTo: (received, expected) => getMatcherResult(Math.round(expected) === Math.round(received), 'toBeCloseTo', received, expected),
  toBeTruthy: (received) => getMatcherResult(!!received === true, 'toBeTruthy', received),
  toBeFalsy: (received) => getMatcherResult(!received === true, 'toBeFalsy', received),
  toBeGreaterThan: (received, expected) => getMatcherResult(received > expected, 'toBeGreaterThan', received, expected),
  toBeLessThan: (received, expected) => getMatcherResult(received < expected, 'toBeLessThan', received, expected),
  toBeGreaterThanOrEqual: (received, expected) => getMatcherResult(received >= expected, 'toBeGreaterThanOrEqual', received, expected),
  toBeLessThanOrEqual: (received, expected) => getMatcherResult(received <= expected, 'toBeLessThanOrEqual', received, expected),
  toBeNaN: (received) => getMatcherResult(isNaN(received), 'toBeNaN', received),
  toMatch: (received, expected) => {
    const result = typeof expected === 'string' ? received.includes(expected) : new RegExp(expected).test(received);
    return getMatcherResult(result, 'toMatch', received, expected);
  },
  toMatchObject: (received, expected) => getMatcherResult(isMatch(received, expected), 'toMatchObject', received, expected),
  toContain: (received, expected) => {
    let result;
    if (typeof received === 'string') {
      result = received.indexOf(String(expected)) !== -1;
    } else if (Array.isArray(received)) {
      result = received.indexOf(expected) !== -1;
    } else {
      result = false;
    }
    return getMatcherResult(result, 'toContain', received, expected);
  },
  toHaveLength: (received, expected) => getMatcherResult(received && received.length == expected, 'toHaveLength', received, expected),
  toHaveProperty: (received, keyPath, value) => {
    let hasProp = hasByPath(received, keyPath);
    let result = hasProp;
    if (hasProp && arguments.length === 3) {
      result = deepEqual(getByPath(received, keyPath), value);
    }
    return getMatcherResult(result, 'toHaveProperty', received, keyPath);
  },
  toThrow: (received, expected) => {
    let threw = false;
    let error;
    try {
      if (typeof received === 'function') {
        received();
      } else if (received && typeof received.then === 'function') {
        // async function
        return received.then(
          () => getMatcherResult(false, 'toThrow', received, expected),
          (err) => {
            if (!expected) return getMatcherResult(true, 'toThrow', received, expected);
            if (typeof expected === 'string') return getMatcherResult(err && err.message && err.message.includes(expected), 'toThrow', received, expected);
            if (expected instanceof RegExp) return getMatcherResult(expected.test(err && err.message), 'toThrow', received, expected);
            if (typeof expected === 'function') return getMatcherResult(err instanceof expected, 'toThrow', received, expected);
            return getMatcherResult(false, 'toThrow', received, expected);
          }
        );
      }
    } catch (err) {
      threw = true;
      error = err;
    }
    if (!threw) return getMatcherResult(false, 'toThrow', received, expected);
    if (!expected) return getMatcherResult(true, 'toThrow', received, expected);
    if (typeof expected === 'string') return getMatcherResult(error && error.message && error.message.includes(expected), 'toThrow', received, expected);
    if (expected instanceof RegExp) return getMatcherResult(expected.test(error && error.message), 'toThrow', received, expected);
    if (typeof expected === 'function') return getMatcherResult(error instanceof expected, 'toThrow', received, expected);
    return getMatcherResult(false, 'toThrow', received, expected);
  },
  toBeInstanceOf: (received, expected) => getMatcherResult(received instanceof expected, 'toBeInstanceOf', received, expected),
  toBeArray: (received) => getMatcherResult(isArray(received), 'toBeArray', received),
  toBeObject: (received) => getMatcherResult(isObject(received), 'toBeObject', received),
  toBeString: (received) => getMatcherResult(isString(received), 'toBeString', received),
  toBeNumber: (received) => getMatcherResult(isNumber(received), 'toBeNumber', received),
  toBeBoolean: (received) => getMatcherResult(isBoolean(received), 'toBeBoolean', received),
  toBeFunction: (received) => getMatcherResult(isFunction(received), 'toBeFunction', received),
  toBeDate: (received) => getMatcherResult(isDate(received), 'toBeDate', received),
  toBeRegExp: (received) => getMatcherResult(isRegExp(received), 'toBeRegExp', received),
  toBeEmpty: (received) => getMatcherResult(isEmpty(received), 'toBeEmpty', received),
  toBeValidJSON: (received) => getMatcherResult(isValidJSON(received), 'toBeValidJSON', received),
  toBeValidURL: (received) => getMatcherResult(isValidURL(received), 'toBeValidURL', received),
  toBeValidEmail: (received) => getMatcherResult(isValidEmail(received), 'toBeValidEmail', received),
  toBeValidUUID: (received) => getMatcherResult(isValidUUID(received), 'toBeValidUUID', received),
  toBeWithinRange: (received, min, max) => getMatcherResult(isNumber(received) && received >= min && received <= max, 'toBeWithinRange', received, [min, max]),
  toSatisfy: (received, predicate) => getMatcherResult(typeof predicate === 'function' && predicate(received), 'toSatisfy', received, predicate),
  toMatchSchema: (received, schema) => getMatcherResult(matchSchema(received, schema), 'toMatchSchema', received, schema),
  // --- Spy/Mock Matchers ---
  toHaveBeenCalled: (received) => getMatcherResult(isSpy(received) && received.callCount > 0, 'toHaveBeenCalled', received),
  toHaveBeenCalledWith: (received, ...args) => getMatcherResult(isSpy(received) && received.calls.some(call => deepEqual(call, args)), 'toHaveBeenCalledWith', received, args),
  toHaveBeenCalledTimes: (received, times) => getMatcherResult(isSpy(received) && received.callCount === times, 'toHaveBeenCalledTimes', received, times),
  // --- Promise/Async Matchers ---
  async toResolve(received) {
    try { await received; return getMatcherResult(true, 'toResolve', received); }
    catch { return getMatcherResult(false, 'toResolve', received); }
  },
  async toReject(received) {
    try { await received; return getMatcherResult(false, 'toReject', received); }
    catch { return getMatcherResult(true, 'toReject', received); }
  }
};

function generateNotMatchers(matchers) {
  const notMatchers = {};
  for (const key in matchers) {
    notMatchers[key] = (...args) => {
      const result = matchers[key](...args);
      if (result && typeof result.then === 'function') {
        return result.then(res => {
          if (res) {
            // If the original matcher passed, the negated matcher should fail and show error
            getMatcherResult(false, key, args[0], args[1], true);
            return false;
          }
          return true;
        });
      }
      if (result) {
        // If the original matcher passed, the negated matcher should fail and show error
        getMatcherResult(false, key, args[0], args[1], true);
        return false;
      }
      return true;
    };
  }
  return notMatchers;
}

let userMatchers = {};

function addMatchers(newMatchers) {
  userMatchers = { ...userMatchers, ...newMatchers };
}

function createAsyncMatchers(promise, isReject = false) {
  return new Proxy({}, {
    get(target, matcherName) {
      return async (...args) => {
        try {
          const value = await promise;
          if (isReject) {
            getMatcherResult(false, matcherName, value, args[0]);
            return false;
          }
          return allMatchers(value)[matcherName](...args);
        } catch (err) {
          if (!isReject) {
            getMatcherResult(false, matcherName, err, args[0]);
            return false;
          }
          return allMatchers(err)[matcherName](...args);
        }
      };
    }
  });
}

function allMatchers(received) {
  const matchers = {};
  // Combine base, user, and not matchers
  const all = { ...baseMatchers, ...userMatchers };
  for (const key in all) {
    matchers[key] = (...args) => all[key](received, ...args);
  }
  matchers.not = generateNotMatchers(matchers);

  // Async support: .resolves and .rejects
  if (received && typeof received.then === 'function') {
    matchers.resolves = createAsyncMatchers(received, false);
    matchers.rejects = createAsyncMatchers(received, true);
  }

  return matchers;
}

// Export spy utilities from imported module
module.exports = {
  allMatchers,
  baseMatchers, // for custom matcher extension
  addMatchers,
  createSpy,
  spy,
  stub,
  mock
}