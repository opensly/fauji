import { getMatcherResult, isValidJSON, isValidURL, isValidEmail, isValidUUID } from './utils.js';

export function toBeValidJSON(received) {
  return getMatcherResult(isValidJSON(received), 'toBeValidJSON', received);
}
export function toBeValidURL(received) {
  return getMatcherResult(isValidURL(received), 'toBeValidURL', received);
}
export function toBeValidEmail(received) {
  return getMatcherResult(isValidEmail(received), 'toBeValidEmail', received);
}
export function toBeValidUUID(received) {
  return getMatcherResult(isValidUUID(received), 'toBeValidUUID', received);
} 