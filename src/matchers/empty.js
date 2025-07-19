// Empty matcher for Fauji
const { getMatcherResult, isEmpty } = require('./utils');

module.exports = {
  toBeEmpty: (received) => getMatcherResult(isEmpty(received), 'toBeEmpty', received),
}; 