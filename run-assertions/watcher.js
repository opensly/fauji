// import modules
const { allMatchers } = require('../test-matchers/matchers');
const { Logger } = require('../test-runner/logger');

var beforeEachs = [];
var afterEachs = [];
var afterAlls = [];
var beforeAlls = [];

beforeAll = (fn) => {
  fn();
}

beforeEach = (fn) => {
  beforeEachs.push(fn)
}

afterAll = (fn) => {
  afterAlls.push(fn)
}

afterEach = (fn) => {
  afterEachs.push(fn)
}

test = (desc, fn) => {
  const _log = new Logger();
  _log.perceive('test', desc);
  beforeEachs.forEach(fn => fn());
  fn();
  afterEachs.forEach(fn => fn());
}

expect = (exp) => {
  return matchers(exp);
}

matchers = (exp) => { 
  return allMatchers(exp);
}

describe = (desc, fn) => {
  const _log = new Logger();
  _log.perceive('describe', desc);
  beforeAlls.forEach(fn => fn());
  fn();
  afterAlls.forEach(fn => fn());
  resetBnAall();
  resetBnAeach();
}

resetBnAall = () => {
  beforeAlls = [];
  afterAlls = [];
}

resetBnAeach = () => {
  beforeEachs = [];
  afterEachs = [];
}

module.exports = {
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
  test,
  expect,
  describe
}