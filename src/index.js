// Export main modules for library entry point
module.exports = {
  runner: require('./run-assertions/runner'),
  watcher: require('./run-assertions/watcher'),
  logger: require('./run-assertions/logger'),
  setupGlobals: require('./run-assertions/setup-globals'),
  matchers: require('./matchers/matchers'),
};
