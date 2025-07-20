import { getMatcherResult, matchSchema } from './utils.js';

export function toMatchSchema(received, schema) {
  return getMatcherResult(matchSchema(received, schema), 'toMatchSchema', received, schema);
} 