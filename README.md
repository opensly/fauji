![Fauji Mascot](assets/fauji_mascot_512x512.png)

# fauji
A lightweight testing framework for JavaScript.
(Note: Still under development)

## Usage Guide

### Writing Tests
You do **not** need to import `describe`, `test`, `expect`, or hooks in each test file—they are available as globals, just like in Jest!

Create a test file (e.g., `example.test.js`):

```js
describe('Math', () => {
  beforeAll(() => {
    // setup code
  });

  beforeEach(() => {
    // per-test setup
  });

  test('adds numbers', () => {
    expect(1 + 2).toBe(3);
  });

  test('object equality', () => {
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  });

  afterEach(() => {
    // per-test teardown
  });

  afterAll(() => {
    // teardown code
  });
});
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

```js
expect(5).toBe(5);
expect([1, 2, 3]).toContain(2);
expect({ foo: 'bar' }).toHaveProperty('foo', 'bar');
expect(() => { throw new Error('fail'); }).toThrow();
```

### Custom Matchers
You can add your own matchers:
```js
addMatchers({
  toBeDivisibleBy(received, expected) {
    return received % expected === 0;
  }
});

expect(10).toBeDivisibleBy(2);
```

### Fake Timers
Fauji provides a Jest-like fake timers API for controlling time-based code in your tests. This is useful for testing code that uses setTimeout, setInterval, or Date.

```js
describe('timer tests', () => {
  beforeEach(() => useFakeTimers());
  afterEach(() => useRealTimers());

  test('setTimeout call count', () => {
    setTimeout(() => {}, 100);
    setTimeout(() => {}, 200);
    expect(getTimerCallCount('setTimeout')).toBe(2);
    expect(getTimerCalls('setTimeout')[0][1]).toBe(100);
  });
});
```

### Mocking and Spying

```js
const { spy, stub, mock, fn } = require('fauji');

test('spy on function', () => {
  const add = (a, b) => a + b;
  const addSpy = spy(add);
  addSpy(1, 2);
  expect(addSpy.calls.length).toBe(1);
  expect(addSpy.calls[0]).toEqual([1, 2]);
});

test('stub method', () => {
  const obj = { foo: () => 1 };
  const fooStub = stub(obj, 'foo', () => 42);
  expect(obj.foo()).toBe(42);
  fooStub.restore();
});
```
