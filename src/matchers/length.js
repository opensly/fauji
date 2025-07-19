// toHaveLength matcher for Fauji
const { getMatcherResult } = require('./utils');

module.exports = {
  toHaveLength: (received, expected) => getMatcherResult(received && received.length == expected, 'toHaveLength', received, expected),
}; 