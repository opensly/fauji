// Equality matchers for Fauji
const { getMatcherResult, deepEqual } = require('./utils');

module.exports = {
  toBe: (received, expected) => getMatcherResult(received === expected, 'toBe', received, expected),
  toEqual: (received, expected) => getMatcherResult(deepEqual(received, expected), 'toEqual', received, expected),
  toBeNull: (received) => getMatcherResult(received === null, 'toBeNull', received),
  toBeUndefined: (received) => getMatcherResult(received === undefined, 'toBeUndefined', received),
  toBeCloseTo: (received, expected) => getMatcherResult(Math.round(expected) === Math.round(received), 'toBeCloseTo', received, expected),
}; 