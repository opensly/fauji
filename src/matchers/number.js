// Number matchers for Fauji
const { getMatcherResult, isNumber } = require('./utils');

module.exports = {
  toBeGreaterThan: (received, expected) => getMatcherResult(received > expected, 'toBeGreaterThan', received, expected),
  toBeLessThan: (received, expected) => getMatcherResult(received < expected, 'toBeLessThan', received, expected),
  toBeGreaterThanOrEqual: (received, expected) => getMatcherResult(received >= expected, 'toBeGreaterThanOrEqual', received, expected),
  toBeLessThanOrEqual: (received, expected) => getMatcherResult(received <= expected, 'toBeLessThanOrEqual', received, expected),
  toBeNaN: (received) => getMatcherResult(isNaN(received), 'toBeNaN', received),
  toBeWithinRange: (received, min, max) => getMatcherResult(isNumber(received) && received >= min && received <= max, 'toBeWithinRange', received, [min, max]),
}; 