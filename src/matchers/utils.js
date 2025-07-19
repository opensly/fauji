// Matcher utilities for Fauji
const util = require('util');

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

function isMatch(obj, partial) {
  if (typeof obj !== 'object' || obj === null || typeof partial !== 'object' || partial === null) return false;
  for (const key of Object.keys(partial)) {
    if (!(key in obj) || !deepEqual(obj[key], partial[key])) return false;
  }
  return true;
}

function getByPath(obj, path) {
  if (!Array.isArray(path)) path = String(path).split('.');
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

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
  if (typeof received === 'object' && typeof expected === 'object') {
    return `\n  Received: ${util.inspect(received, { depth: 5, colors: false })}\n  Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
  }
  return '';
}

function getMatcherResult(result, matcherName, received, expected, isNot = false) {
  const { Logger } = require('../run-assertions/logger');
  const _log = new Logger();
  if (!result) {
    const notText = isNot ? 'not.' : '';
    const err = new Error();
    const stackLines = (err.stack || '').split('\n');
    let testFrame = stackLines.find(l => l.includes('.js') && !l.includes('matchers.js') && !l.includes('logger.js')) || stackLines[2] || '';
    let location = '';
    const match = testFrame.match(/\(([^)]+)\)/) || testFrame.match(/at ([^ ]+)/);
    if (match && match[1]) {
      location = match[1];
    }
    let codeFrame = '';
    if (location) {
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

function isArray(val) { return Array.isArray(val); }
function isObject(val) { return val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date) && !(val instanceof RegExp); }
function isString(val) { return typeof val === 'string'; }
function isNumber(val) { return typeof val === 'number' && !isNaN(val); }
function isBoolean(val) { return typeof val === 'boolean'; }
function isFunction(val) { return typeof val === 'function'; }
function isDate(val) { return val instanceof Date; }
function isRegExp(val) { return val instanceof RegExp; }

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

module.exports = {
  deepEqual,
  isMatch,
  getByPath,
  hasByPath,
  formatDiff,
  getMatcherResult,
  isArray,
  isObject,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isDate,
  isRegExp,
  isEmpty,
  isValidJSON,
  isValidURL,
  isValidEmail,
  isValidUUID,
  matchSchema,
}; 