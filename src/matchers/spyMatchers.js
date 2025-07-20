import { getMatcherResult, deepEqual } from './utils.js';
import { isSpy } from './spy.js';

export function toHaveBeenCalled(received) {
  return getMatcherResult(isSpy(received) && received.callCount > 0, 'toHaveBeenCalled', received);
}
export function toHaveBeenCalledWith(received, ...args) {
  return getMatcherResult(isSpy(received) && received.calls.some((call) => deepEqual(call, args)), 'toHaveBeenCalledWith', received, args);
}
export function toHaveBeenCalledTimes(received, times) {
  return getMatcherResult(isSpy(received) && received.callCount === times, 'toHaveBeenCalledTimes', received, times);
} 