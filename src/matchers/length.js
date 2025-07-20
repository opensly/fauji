import { getMatcherResult } from './utils.js';

export function toHaveLength(received, expected) {
  return getMatcherResult(received && received.length == expected, 'toHaveLength', received, expected);
} 