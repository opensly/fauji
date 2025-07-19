// Validation matchers for Fauji
const { getMatcherResult, isValidJSON, isValidURL, isValidEmail, isValidUUID } = require('./utils');

module.exports = {
  toBeValidJSON: (received) => getMatcherResult(isValidJSON(received), 'toBeValidJSON', received),
  toBeValidURL: (received) => getMatcherResult(isValidURL(received), 'toBeValidURL', received),
  toBeValidEmail: (received) => getMatcherResult(isValidEmail(received), 'toBeValidEmail', received),
  toBeValidUUID: (received) => getMatcherResult(isValidUUID(received), 'toBeValidUUID', received),
}; 