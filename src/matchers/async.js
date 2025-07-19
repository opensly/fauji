// Async/Promise matchers for Fauji
const { getMatcherResult } = require('./utils');

module.exports = {
  async toResolve(received) {
    try { await received; return getMatcherResult(true, 'toResolve', received); }
    catch { return getMatcherResult(false, 'toResolve', received); }
  },
  async toReject(received) {
    try { await received; return getMatcherResult(false, 'toReject', received); }
    catch { return getMatcherResult(true, 'toReject', received); }
  },
}; 