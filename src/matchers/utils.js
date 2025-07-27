// Matcher utilities for Fauji
import util from 'util';
import deepEqualCheck from 'deep-equal-check';

export function isMatch(obj, partial) {
  if (typeof obj !== 'object' || obj === null || typeof partial !== 'object' || partial === null) return false;
  for (const key of Object.keys(partial)) {
    if (!(key in obj)) return false;
    
    // For nested objects, recursively check partial matching
    if (typeof partial[key] === 'object' && partial[key] !== null && !Array.isArray(partial[key])) {
      if (typeof obj[key] !== 'object' || obj[key] === null || Array.isArray(obj[key])) return false;
      if (!isMatch(obj[key], partial[key])) return false;
    } else {
      // For primitive values, use exact equality
      if (!deepEqualCheck(obj[key], partial[key])) return false;
    }
  }
  return true;
}

export function getByPath(obj, path) {
  if (!Array.isArray(path)) path = String(path).split('.');
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function hasByPath(obj, path) {
  if (!Array.isArray(path)) path = String(path).split('.');
  let cur = obj;
  for (const key of path) {
    if (cur == null || !(key in cur)) return false;
    cur = cur[key];
  }
  return true;
}

export function formatDiff(received, expected) {
  if (typeof received === 'object' && typeof expected === 'object') {
    return `\n  Received: ${util.inspect(received, { depth: 5, colors: false })}\n  Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
  }
  return '';
}

export function getMatcherResult(result, matcherName, received, expected, isNot = false) {
  if (!result) {
    try {
      const notText = isNot ? 'not.' : '';
      const err = new Error();
      const stackLines = (err.stack || '').split('\n');
      let testFrame = stackLines.find(l => l.includes('.js') && !l.includes('matchers.js') && !l.includes('../logger/logger-core.js')) || stackLines[2] || '';
      let location = '';
      const match = testFrame.match(/\(([^)]+)\)/) || testFrame.match(/at ([^ ]+)/);
      if (match && match[1]) {
        location = match[1];
      }
      // Extract data from spy/mock functions for better error reporting
      let actualReceived = received;
      if (typeof received === 'function' && !Array.isArray(received)) {
        // Handle mock functions (Jest-like)
        if (received.mock && received.mock.calls) {
          actualReceived = received.mock.calls;
        } else if (received.mock && received.mock.results) {
          const returnValues = received.mock.results
            .filter(result => result.type === 'return')
            .map(result => result.value);
          actualReceived = returnValues.length === 1 ? returnValues[0] : returnValues;
        }
        // Handle spy functions (Fauji-like)
        else if (received.calls) {
          actualReceived = received.calls;
        } else if (received.results) {
          const returnValues = received.results
            .filter(result => result.type === 'return')
            .map(result => result.value);
          actualReceived = returnValues.length === 1 ? returnValues[0] : returnValues;
        }
      }
      // Extract actual received data for error reporting
      let message = '';
      message += `\n${location ? 'at ' + location : ''}`;
      message += `\n\nDifference:`;
      if (typeof expected !== 'undefined') {
        message += `\n- Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
        message += `\n+ Received: ${util.inspect(actualReceived, { depth: 5, colors: false })}`;
      } else {
        message += `\n- Expected: ${notText}${matcherName}`;
        message += `\n+ Received: ${util.inspect(actualReceived, { depth: 5, colors: false })}`;
      }
      if (["toEqual", "toMatchObject"].includes(matcherName) && typeof actualReceived === 'object' && typeof expected === 'object') {
        message += formatDiff(actualReceived, expected);
      }
      message += '\n';
      const assertionError = new Error(message);
      assertionError.expected = expected;
      assertionError.actual = actualReceived;
      assertionError.matcherName = matcherName;
      assertionError.isNot = isNot;
      throw assertionError;
    } catch (error) {
      // Always extract actualReceived for fallback error as well
      let actualReceived = received;
      if (typeof received === 'function' && !Array.isArray(received)) {
        // Handle mock functions (Jest-like)
        if (received.mock && received.mock.calls) {
          actualReceived = received.mock.calls;
        } else if (received.mock && received.mock.results) {
          const returnValues = received.mock.results
            .filter(result => result.type === 'return')
            .map(result => result.value);
          actualReceived = returnValues.length === 1 ? returnValues[0] : returnValues;
        }
        // Handle spy functions (Fauji-like)
        else if (received.calls) {
          actualReceived = received.calls;
        } else if (received.results) {
          const returnValues = received.results
            .filter(result => result.type === 'return')
            .map(result => result.value);
          actualReceived = returnValues.length === 1 ? returnValues[0] : returnValues;
        }
      }
      const simpleError = new Error(`Assertion failed: ${matcherName}`);
      simpleError.expected = expected;
      simpleError.actual = actualReceived;
      simpleError.matcherName = matcherName;
      simpleError.isNot = isNot;
      throw simpleError;
    }
  }
  return result;
}

export function isArray(val) { return Array.isArray(val); }
export function isObject(val) { return val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date) && !(val instanceof RegExp); }
export function isString(val) { return typeof val === 'string'; }
export function isNumber(val) { return typeof val === 'number' && !isNaN(val); }
export function isBoolean(val) { return typeof val === 'boolean'; }
export function isFunction(val) { return typeof val === 'function'; }
export function isDate(val) { return val instanceof Date; }
export function isRegExp(val) { return val instanceof RegExp; }

export function isEmpty(val) {
  if (val == null) return true;
  if (typeof val === 'string' || Array.isArray(val)) return val.length === 0;
  if (val instanceof Map || val instanceof Set) return val.size === 0;
  if (typeof val === 'object') return Object.keys(val).length === 0;
  return false;
}
export function isValidJSON(val) {
  if (typeof val !== 'string') return false;
  try { JSON.parse(val); return true; } catch { return false; }
}
export function isValidURL(val) {
  try { new URL(val); return true; } catch { return false; }
}
export function isValidEmail(val) {
  return typeof val === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
}
export function isValidUUID(val) {
  return typeof val === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
}

export function matchSchema(obj, schema) {
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
