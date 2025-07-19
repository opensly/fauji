// Spy/Mock matchers for Fauji
const { getMatcherResult, deepEqual } = require('./utils');
const { isSpy } = require('./spy');

module.exports = {
  toHaveBeenCalled: (received) => getMatcherResult(isSpy(received) && received.callCount > 0, 'toHaveBeenCalled', received),
  toHaveBeenCalledWith: (received, ...args) => getMatcherResult(isSpy(received) && received.calls.some(call => deepEqual(call, args)), 'toHaveBeenCalledWith', received, args),
  toHaveBeenCalledTimes: (received, times) => getMatcherResult(isSpy(received) && received.callCount === times, 'toHaveBeenCalledTimes', received, times),
}; 