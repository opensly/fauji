// Object matchers for Fauji
const { getMatcherResult, isMatch, hasByPath, getByPath, deepEqual } = require('./utils');

module.exports = {
  toMatchObject: (received, expected) => getMatcherResult(isMatch(received, expected), 'toMatchObject', received, expected),
  toHaveProperty: (received, keyPath, value) => {
    let hasProp = hasByPath(received, keyPath);
    let result = hasProp;
    if (hasProp && arguments.length === 3) {
      result = deepEqual(getByPath(received, keyPath), value);
    }
    return getMatcherResult(result, 'toHaveProperty', received, keyPath);
  },
}; 