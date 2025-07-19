// Test and suite registration for Fauji
const { Suite, getCurrentSuite, setCurrentSuite } = require('./suite');

function describe(desc, fn) {
  return _describe(desc, fn, 'normal');
}
describe.only = (desc, fn) => _describe(desc, fn, 'only');
describe.skip = (desc, fn) => _describe(desc, fn, 'skip');

function _describe(desc, fn, mode) {
  const suite = new Suite(desc, mode);
  suite.parent = getCurrentSuite();
  getCurrentSuite().suites.push(suite);
  setCurrentSuite(suite);
  fn();
  setCurrentSuite(suite.parent);
}

function test(desc, fn) {
  return _test(desc, fn, 'normal');
}
test.only = (desc, fn) => _test(desc, fn, 'only');
test.skip = (desc, fn) => _test(desc, fn, 'skip');

function _test(desc, fn, mode) {
  getCurrentSuite().tests.push({ desc, fn, mode });
}

module.exports = {
  describe,
  test,
}; 