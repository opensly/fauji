// Schema validation matcher for Fauji
const { getMatcherResult, matchSchema } = require('./utils');

module.exports = {
  toMatchSchema: (received, schema) => getMatcherResult(matchSchema(received, schema), 'toMatchSchema', received, schema),
}; 