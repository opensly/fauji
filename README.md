![Fauji Mascot](assets/fauji_mascot_512x512.png)

# fauji
A lightweight testing framework for JavaScript/TypeScript.
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

### Fake Timers
Fauji provides a Jest-like fake timers API for controlling time-based code in your tests. This is useful for testing code that uses setTimeout, setInterval, or Date.

**API:**
- `useFakeTimers()`: Switch to fake timers (mock setTimeout, setInterval, Date, etc.)
- `useRealTimers()`: Restore real timers and Date
- `advanceTimersByTime(ms)`: Advance the fake clock by `ms` milliseconds, running any scheduled timers
- `runAllTimers()`: Run all pending timers and intervals
- `resetTimers()`: Reset the fake timer state (clears all scheduled timers/intervals)

**Example:**
```js
describe('timer tests', () => {
  beforeEach(() => {
    useFakeTimers();
  });
  afterEach(() => {
    useRealTimers();
  });

  test('setTimeout works', () => {
    let called = false;
    setTimeout(() => { called = true; }, 1000);
    advanceTimersByTime(999);
    expect(called).toBe(false);
    advanceTimersByTime(1);
    expect(called).toBe(true);
  });

  test('setInterval works', () => {
    let count = 0;
    const id = setInterval(() => { count++; }, 500);
    advanceTimersByTime(1500);
    expect(count).toBe(3);
    clearInterval(id);
  });
});
```

### Mocking
Fauji now provides enhanced Jest-like mocking APIs for modules and functions.

**API:**
- `fn(impl?)`: Create a mock function (tracks calls/instances)
- `spyOn(obj, methodName)`: Spy on an object's method
- `mock(modulePath, mockImpl?)`: Mock a module. If no mockImpl is provided, auto-mocks all exports as mock functions
- `unmock(modulePath)`: Restore the original module
- `resetAllMocks()`: Restore all mocked modules to their original state (called automatically after each test)
- `requireActual(modulePath)`: Get the real, unmocked module
- `requireMock(modulePath)`: Get the current mock for a module

**Manual Mocks:**
If a `__mocks__/module.js` file exists next to your module, it will be used automatically when you call `mock('module')` with no second argument.

**Named Export Mocking:**
You can mock specific named exports by passing an object as the second argument to `mock()`:
```js
mock('./math', { add: fn(() => 99) });
const math = require('./math');
expect(math.add()).toBe(99);
```

**Manual Mock Example:**
```
project/
  math.js
  __mocks__/
    math.js  // <-- this file will be used as the mock
```
```js
mock('./math');
const math = require('./math');
// math is now the manual mock
```

**requireActual/requireMock Example:**
```js
mock('./math');
const mathMock = requireMock('./math');
const mathReal = requireActual('./math');
```

**Examples:**
```js
const math = require('./math');

describe('mocking', () => {
  test('auto-mock all exports', () => {
    mock('./math');
    math.add(1, 2);
    expect(math.add.mock.calls.length).toBe(1);
    unmock('./math');
  });

  test('manual mock', () => {
    mock('./math', { add: fn(() => 42) });
    expect(math.add(1, 2)).toBe(42);
    unmock('./math');
  });

  test('spyOn', () => {
    const obj = { foo: (x) => x + 1 };
    const spy = spyOn(obj, 'foo');
    obj.foo(5);
    expect(spy.mock.calls[0][0]).toBe(5);
    spy.restore();
  });
});
```
