import { getMatcherResult } from './utils.js';

export function toMatch(received, expected) {
  return getMatcherResult(typeof received === 'string' && (expected instanceof RegExp ? expected.test(received) : received.includes(expected)), 'toMatch', received, expected);
}

export function toContain(received, expected) {
  let result;
  if (typeof received === 'string') {
    result = received.indexOf(String(expected)) !== -1;
  } else if (Array.isArray(received)) {
    result = received.indexOf(expected) !== -1;
  } else {
    result = false;
  }
  return getMatcherResult(result, 'toContain', received, expected);
} 