import { getMatcherResult } from './utils.js';

export function toSatisfy(received, predicate) {
  return getMatcherResult(typeof predicate === 'function' && predicate(received), 'toSatisfy', received, predicate);
} 