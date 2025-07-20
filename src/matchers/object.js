import { getMatcherResult, isMatch, hasByPath, getByPath, deepEqual } from './utils.js';

export function toMatchObject(received, expected) {
  return getMatcherResult(isMatch(received, expected), 'toMatchObject', received, expected);
}
export function toHaveProperty(received, key, value) {
  const has = hasByPath(received, key);
  const val = getByPath(received, key);
  return getMatcherResult(has && (arguments.length < 3 || deepEqual(val, value)), 'toHaveProperty', received, key);
} 