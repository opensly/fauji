// Fauji DOM Utilities: Querying, Events, and Custom Matchers
//
// This module re-exports DOM querying utilities and event simulation helpers from
// @testing-library/dom and @testing-library/user-event, and registers jest-dom matchers
// with Fauji's matcher system if available.

let queries = {};
let fireEvent, userEvent;

try {
  // Import all queries from @testing-library/dom
  queries = require('@testing-library/dom');
  fireEvent = queries.fireEvent;
} catch (e) {
  console.warn('[fauji] @testing-library/dom is not installed. DOM querying utilities will not be available.');
}

try {
  userEvent = require('@testing-library/user-event').default;
} catch (e) {
  console.warn('[fauji] @testing-library/user-event is not installed. userEvent will not be available.');
}

// Register jest-dom matchers with Fauji if available
try {
  const jestDomMatchers = require('jest-dom/extend-expect');
  const { addMatchers } = require('../matchers/matchers');
  addMatchers(jestDomMatchers);
} catch (e) {
  // Try @testing-library/jest-dom if jest-dom is not found
  try {
    const jestDomMatchers = require('@testing-library/jest-dom/matchers');
    const { addMatchers } = require('../matchers/matchers');
    addMatchers(jestDomMatchers);
  } catch (e2) {
    // No jest-dom matchers found
    // It's fine, just skip
  }
}

module.exports = {
  ...queries,
  fireEvent,
  userEvent
}; 