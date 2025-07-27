import { getMatcherResult } from './utils.js';

export async function toResolve(received) {
  try {
    await received;
    return getMatcherResult(true, 'toResolve', received);
  } catch {
    return getMatcherResult(false, 'toResolve', received);
  }
}

export async function toReject(received) {
  try {
    await received;
    return getMatcherResult(false, 'toReject', received);
  } catch {
    return getMatcherResult(true, 'toReject', received);
  }
} 

// Create a rejects object that can be chained with other matchers
export function rejects(received) {
  return {
    toThrow: async (expected) => {
      try {
        await received;
        return getMatcherResult(false, 'rejects.toThrow', received, expected);
      } catch (error) {
        // Use the same logic as the toThrow matcher
        if (!expected) return getMatcherResult(true, 'rejects.toThrow', received, expected);
        if (typeof expected === 'string') return getMatcherResult(error && error.message && error.message.includes(expected), 'rejects.toThrow', received, expected);
        if (expected instanceof RegExp) return getMatcherResult(expected.test(error && error.message), 'rejects.toThrow', received, expected);
        if (typeof expected === 'function') return getMatcherResult(error instanceof expected, 'rejects.toThrow', received, expected);
        return getMatcherResult(false, 'rejects.toThrow', received, expected);
      }
    }
  };
} 