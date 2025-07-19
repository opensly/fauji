// Type matchers for Fauji
const { getMatcherResult, isArray, isObject, isString, isNumber, isBoolean, isFunction, isDate, isRegExp } = require('./utils');

module.exports = {
  toBeArray: (received) => getMatcherResult(isArray(received), 'toBeArray', received),
  toBeObject: (received) => getMatcherResult(isObject(received), 'toBeObject', received),
  toBeString: (received) => getMatcherResult(isString(received), 'toBeString', received),
  toBeNumber: (received) => getMatcherResult(isNumber(received), 'toBeNumber', received),
  toBeBoolean: (received) => getMatcherResult(isBoolean(received), 'toBeBoolean', received),
  toBeFunction: (received) => getMatcherResult(isFunction(received), 'toBeFunction', received),
  toBeDate: (received) => getMatcherResult(isDate(received), 'toBeDate', received),
  toBeRegExp: (received) => getMatcherResult(isRegExp(received), 'toBeRegExp', received),
}; 