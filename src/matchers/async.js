import { getMatcherResult } from './utils.js';

export async function toResolve(received) {
  try {
    await received;
    return getMatcherResult(true, 'toResolve', received);
  } catch {
    return getMatcherResult(false, 'toResolve', received);
  }
}

export async function toReject(received) {
  try {
    await received;
    return getMatcherResult(false, 'toReject', received);
  } catch {
    return getMatcherResult(true, 'toReject', received);
  }
} 