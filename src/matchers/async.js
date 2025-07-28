import { getMatcherResult } from './utils.js';

export async function toResolve(received) {
  try {
    await received;
    return getMatcherResult(true, 'toResolve', received);
  } catch (error) {
    // For async matchers, we need to handle failures differently
    // Return a result object that indicates failure without throwing
    return {
      success: false,
      error: new Error(`Expected promise to resolve, but it rejected with: ${error.message}`),
      matcherName: 'toResolve',
      received: received
    };
  }
}

export async function toReject(received) {
  try {
    await received;
    // For async matchers, we need to handle failures differently
    // Return a result object that indicates failure without throwing
    return {
      success: false,
      error: new Error('Expected promise to reject, but it resolved'),
      matcherName: 'toReject',
      received: received
    };
  } catch (error) {
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