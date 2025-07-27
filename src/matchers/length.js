import { getMatcherResult } from './utils.js';

export function toHaveLength(received, expected) {
  // Validate that received is an array or string
  if (!Array.isArray(received) && typeof received !== 'string') {
    return getMatcherResult(false, 'toHaveLength', received, expected);
  }
  return getMatcherResult(received.length === expected, 'toHaveLength', received, expected);
} 