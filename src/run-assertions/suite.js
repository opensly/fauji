export const rootSuite = { 
  desc: 'root', 
  suites: [], 
  tests: [], 
  hooks: { beforeAll: [], afterAll: [], beforeEach: [], afterEach: [] }, 
  fixtures: {}, 
  parent: null 
};

let currentSuite = rootSuite;

export function getCurrentSuite() {
  return currentSuite;
}

export function setCurrentSuite(suite) {
  currentSuite = suite;
}

export class Suite {
  constructor(desc, mode = 'normal', annotations = {}) {
    this.desc = desc;
    this.mode = mode;
    this.annotations = annotations;
    this.suites = [];
    this.tests = [];
    this.hooks = { beforeAll: [], afterAll: [], beforeEach: [], afterEach: [] };
    this.fixtures = {};
    this.parent = null;
  }
}

export default {
  rootSuite,
  getCurrentSuite,
  setCurrentSuite,
  Suite,
};
