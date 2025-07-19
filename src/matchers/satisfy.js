// Satisfy matcher for Fauji
const { getMatcherResult } = require('./utils');

module.exports = {
  toSatisfy: (received, predicate) => getMatcherResult(typeof predicate === 'function' && predicate(received), 'toSatisfy', received, predicate),
}; 