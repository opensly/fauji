// Hook registration for Fauji
const { getCurrentSuite } = require('./suite');

function beforeAll(fn) {
  getCurrentSuite().hooks.beforeAll.push(fn);
}
function afterAll(fn) {
  getCurrentSuite().hooks.afterAll.push(fn);
}
function beforeEach(fn) {
  getCurrentSuite().hooks.beforeEach.push(fn);
}
function afterEach(fn) {
  getCurrentSuite().hooks.afterEach.push(fn);
}

module.exports = {
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
}; 