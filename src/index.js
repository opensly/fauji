// Export main modules for library entry point
const runner = require('./run-assertions/runner');
const logger = require('./run-assertions/logger');
const setupGlobals = require('./run-assertions/setup-globals');
const matchers = require('./matchers/index.js');
const spy = require('./matchers/spy').spy;
const stub = require('./matchers/spy').stub;
const mock = require('./matchers/spy').mock;
const { run } = require('./run-assertions/runner-core');

module.exports = {
  runner,
  logger,
  setupGlobals,
  run,
  addMatchers: matchers.addMatchers,
  ...matchers,
  spy,
  stub,
  mock,
};
