import { getMatcherResult, isArray, isObject, isString, isNumber, isBoolean, isFunction, isDate, isRegExp } from './utils.js';

export function toBeArray(received) {
  return getMatcherResult(isArray(received), 'toBeArray', received);
}
export function toBeObject(received) {
  return getMatcherResult(isObject(received), 'toBeObject', received);
}
export function toBeString(received) {
  return getMatcherResult(isString(received), 'toBeString', received);
}
export function toBeNumber(received) {
  return getMatcherResult(isNumber(received), 'toBeNumber', received);
}
export function toBeBoolean(received) {
  return getMatcherResult(isBoolean(received), 'toBeBoolean', received);
}
export function toBeFunction(received) {
  return getMatcherResult(isFunction(received), 'toBeFunction', received);
}
export function toBeDate(received) {
  return getMatcherResult(isDate(received), 'toBeDate', received);
}
export function toBeRegExp(received) {
  return getMatcherResult(isRegExp(received), 'toBeRegExp', received);
} 