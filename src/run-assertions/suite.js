// Suite management for Fauji
class Suite {
  constructor(desc, mode = 'normal') {
    this.desc = desc;
    this.tests = [];
    this.suites = [];
    this.hooks = { beforeAll: [], beforeEach: [], afterEach: [], afterAll: [] };
    this.parent = null;
    this.mode = mode; // 'normal', 'only', 'skip'
  }
}

const rootSuite = new Suite('');
let currentSuite = rootSuite;

function setCurrentSuite(suite) {
  currentSuite = suite;
}
function getCurrentSuite() {
  return currentSuite;
}

module.exports = {
  Suite,
  rootSuite,
  getCurrentSuite,
  setCurrentSuite,
}; 