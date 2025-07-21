// Equality matchers for Fauji
import { getMatcherResult } from './utils.js';
import deepEqualCheck from 'deep-equal-check';

export function toBe(received, expected) {
  return getMatcherResult(received === expected, 'toBe', received, expected);
}

export function toEqual(received, expected) {
  return getMatcherResult(deepEqualCheck(received, expected), 'toEqual', received, expected);
}

export function toBeNull(received) {
  return getMatcherResult(received === null, 'toBeNull', received);
}

export function toBeUndefined(received) {
  return getMatcherResult(received === undefined, 'toBeUndefined', received);
}

export function toBeCloseTo(received, expected) {
  return getMatcherResult(Math.round(expected) === Math.round(received), 'toBeCloseTo', received, expected);
} 