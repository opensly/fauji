// Export main modules for library entry point
module.exports = {
  runner: require('./run-assertions/runner'),
  logger: require('./run-assertions/logger'),
  setupGlobals: require('./run-assertions/setup-globals'),
  matchers: require('./matchers/index.js'),
  spy: require('./matchers/spy').spy,
  stub: require('./matchers/spy').stub,
  mock: require('./matchers/spy').mock,
};
