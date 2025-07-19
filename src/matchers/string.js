// String matchers for Fauji
const { getMatcherResult } = require('./utils');

module.exports = {
  toMatch: (received, expected) => {
    const result = typeof expected === 'string' ? received.includes(expected) : new RegExp(expected).test(received);
    return getMatcherResult(result, 'toMatch', received, expected);
  },
  toContain: (received, expected) => {
    let result;
    if (typeof received === 'string') {
      result = received.indexOf(String(expected)) !== -1;
    } else if (Array.isArray(received)) {
      result = received.indexOf(expected) !== -1;
    } else {
      result = false;
    }
    return getMatcherResult(result, 'toContain', received, expected);
  },
}; 