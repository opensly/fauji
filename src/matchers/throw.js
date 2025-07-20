import { getMatcherResult } from './utils.js';

export function toThrow(received, expected) {
  let threw = false;
  let error;
  try {
    if (typeof received === 'function') {
      received();
    } else if (received && typeof received.then === 'function') {
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
} 