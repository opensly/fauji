import { getMatcherResult } from './utils.js';

export function toMatch(received, expected) {
  return getMatcherResult(typeof received === 'string' && (expected instanceof RegExp ? expected.test(received) : received.includes(expected)), 'toMatch', received, expected);
}

export function toContain(received, expected) {
  let result;
  if (typeof received === 'string') {
    result = received.indexOf(String(expected)) !== -1;
  } else if (Array.isArray(received)) {
    // For objects, use deep equality check
    if (typeof expected === 'object' && expected !== null && !Array.isArray(expected)) {
      result = received.some(item => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          // Deep equality check for objects
          const keys1 = Object.keys(item);
          const keys2 = Object.keys(expected);
          if (keys1.length !== keys2.length) return false;
          return keys1.every(key => keys2.includes(key) && item[key] === expected[key]);
        }
        return item === expected;
      });
    } else {
      result = received.indexOf(expected) !== -1;
    }
  } else {
    result = false;
  }
  return getMatcherResult(result, 'toContain', received, expected);
} 