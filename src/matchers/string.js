import { getMatcherResult } from './utils.js';

export function toMatch(received, expected) {
  if (typeof received !== 'string') {
    return getMatcherResult(false, 'toMatch', received, expected);
  }
  
  if (expected instanceof RegExp) {
    return getMatcherResult(expected.test(received), 'toMatch', received, expected);
  } else {
    // For string arguments, use case-insensitive matching by default
    return getMatcherResult(received.toLowerCase().includes(String(expected).toLowerCase()), 'toMatch', received, expected);
  }
}

export function toContain(received, expected) {
  let result;
  if (typeof received === 'string') {
    // For string arguments, use case-insensitive matching by default
    result = received.toLowerCase().indexOf(String(expected).toLowerCase()) !== -1;
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