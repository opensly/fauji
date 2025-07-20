import { getMatcherResult, isNumber } from './utils.js';

export function toBeGreaterThan(received, expected) {
  return getMatcherResult(isNumber(received) && received > expected, 'toBeGreaterThan', received, expected);
}
export function toBeGreaterThanOrEqual(received, expected) {
  return getMatcherResult(isNumber(received) && received >= expected, 'toBeGreaterThanOrEqual', received, expected);
}
export function toBeLessThan(received, expected) {
  return getMatcherResult(isNumber(received) && received < expected, 'toBeLessThan', received, expected);
}
export function toBeLessThanOrEqual(received, expected) {
  return getMatcherResult(isNumber(received) && received <= expected, 'toBeLessThanOrEqual', received, expected);
} 