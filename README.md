![Fauji Mascot](assets/fauji_mascot_512x512.png)

# fauji
A simple JavaScript assertion library for Node.js & browser.
(Note: Still under development)

## TypeScript Support
TypeScript users get autocompletion and type safety for all matchers and custom matchers. Typings are provided at `matchers/index.d.ts` and are automatically detected if you use this package in a TypeScript project.

## Usage Guide

### Writing Tests
You do **not** need to import `describe`, `test`, `expect`, or hooks in each test file—they are available as globals, just like in Jest!

Create a test file (e.g., `example.test.js`):

```js
describe('Math', () => {
  beforeAll(() => { /* setup */ });
  beforeEach(() => { /* per-test setup */ });

  test('adds', () => {
    expect(1 + 1).toBe(2);
  });

  test('object equality', () => {
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  });

  afterEach(() => { /* per-test teardown */ });
  afterAll(() => { /* teardown */ });
});

run(); // Call at the end of your test file
```

### Running Tests
Use the CLI to run your tests:

```sh
npx fauji --dir ./tests --pattern test.js --name math --watch
```
- `--dir` or `-d`: Test directory (default: current directory)
- `--pattern` or `-p`: Test file pattern (default: `test.js`)
- `--name` or `-n`: Filter test files by name
- `--watch` or `-w`: Watch mode (reruns tests on file changes)

### Matchers
A matcher is a method that lets you test values. The following matchers are available:
- **toBe**: strict equality (`===`)
- **toEqual**: deep equality (objects/arrays)
- **toBeNull**, **toBeUndefined**, **toBeCloseTo**, **toBeTruthy**, **toBeFalsy**
- **toBeGreaterThan**, **toBeGreaterThanOrEqual**, **toBeLessThan**, **toBeLessThanOrEqual**
- **toBeNaN**, **toMatch**, **toMatchObject**, **toContain**, **toHaveLength**, **toHaveProperty**
- **toThrow**, **toBeInstanceOf**
- All matchers support `.not` for negation: `expect(x).not.toEqual(y)`
- Async support: `await expect(Promise.resolve(5)).resolves.toBe(5)`

### Custom Matchers
You can add your own matchers:
```js
const { addMatchers } = require('./matchers/matchers');
addMatchers({
  toBeDivisibleBy: (received, expected) => received % expected === 0
});
expect(10).toBeDivisibleBy(2);
```

### Test Suites & Hooks
- `describe(name, fn)`: Group related tests
- `test(name, fn)`: Define a test
- `beforeAll`, `afterAll`, `beforeEach`, `afterEach`: Setup/teardown hooks (scoped to suite)

### Results Logging
- Jest-like output: colored pass/fail, test durations, suite/test hierarchy, summary at end

---

## Features

#### Matchers
A matcher is a method that lets you test values. The following matchers, compares the value of the result of expect() with the value passed in as argument, are:
- **toBe** compares strict equality, using ===
- **toEqual** compares the values of two variables. If it's an object or array, it checks the equality of all the properties or elements
- **toBeNull** is true when passing a null value
- **toBeUndefined** is true when passing an undefined value
- **toBeCloseTo** is used to compare floating values, avoiding rounding errors
- **toBeTruthy** true if the value is considered true (like an if does)
- **toBeFalsy** true if the value is considered false (like an if does)
- **toBeGreaterThan** true if the result of expect() is higher than the argument
- **toBeGreaterThanOrEqual** true if the result of expect() is equal to the argument, or higher than the argument
- **toBeLessThan** true if the result of expect() is lower than the argument
- **toBeLessThanOrEqual** true if the result of expect() is equal to the argument, or lower than the argument
- **toBeNaN**
- **toMatch** is used to compare strings with regular expression pattern matching
- **toMatchObject** to check that a JavaScript object matches a subset of the properties of an object.
- **toContain** is used in arrays, true if the expected array contains the argument in its elements set
- **toHaveLength(number)** checks the length of an array
- **toHaveProperty(key, value)** checks if an object has a property, and optionally checks its value
- **toThrow** checks if a function you pass throws an exception (in general) or a specific exception
- **toBeInstanceOf():** checks if an object is an instance of a class.

#### Setup
Before running your tests you will want to perform some initialization.
- beforeAll(), to do something once before all the tests runs
- beforeEach(), to perform something before each test runs

#### Teardown
Just as you can do with setup, you can also perform something after each test runs
- afterEach(), to perform something after each test runs
- afterAll(), to perform something after all the tests runs
