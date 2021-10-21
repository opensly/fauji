# be-assertive
A simple javascript assertion library for Node.js & browser.


### Features

#### Matchers
A matcher is a method that lets you test values. The following matchers, compares the value of the result of expect() with the value passed in as argument, are:
- **toBe** compares strict equality, using ===
- **toEqual** compares the values of two variables. If it’s an object or array, it checks the equality of all the properties or elements
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
