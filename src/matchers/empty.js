import { getMatcherResult, isEmpty } from './utils.js';

export function toBeEmpty(received) {
  return getMatcherResult(isEmpty(received), 'toBeEmpty', received);
} 