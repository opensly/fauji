// import dependencies
const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;

// import modules
const { Logger } = require('../test-runner/logger');

const _log = new Logger();

allMatchers = (received) => ({
  not : {
    toBe: (expected) => {
      let result = (received === expected) ? true : false;
      _log.status(!result);
      return !result;
    }
  },
  toBe: (expected) => {
    let result = (received === expected) ? true : false;
    _log.status(result);
    return result;
  },
  toEqual: (expected) => {
    let result = _.isEqual(received, expected);
    _log.status(result);
    return result;
  },
  toBeNull: () => {
    let result = (received === null) ? true : false;
    _log.status(result);
    return result;
  },
  toBeUndefined: () => {
    let result = (received === undefined) ? true : false;
    _log.status(result);
    return result;
  },
  toBeCloseTo: (expected) => { //new
    let result = (Math.round(expected) === Math.round(received)) ? true : false;
    _log.status(result);
    return result;
  },
  toBeTruthy: () => {
    let result = (received === true) ? true : false;
    _log.status(result);
    return result;
  },
  toBeFalsy: () => {
    let result = (received === false) ? true : false;
    _log.status(result);
    return result;
  },
  toBeGreaterThan: (expected) => {
    let result = (received > expected) ? true : false;
    _log.status(result);
    return result;
  },
  toBeLessThan: (expected) => {
    let result = (received < expected) ? true : false;
    _log.status(result);
    return result;
  },
  toBeGreaterThanOrEqual: (expected) => {
    let result = (received >= expected) ? true : false;
    _log.status(result);
    return result;
  },
  toBeLessThanOrEqual: (expected) => {
    let result = (received <= expected) ? true : false;
    _log.status(result);
    return result;
  },
  toBeNaN: () => {
    let result = (isNaN(received)) ? true : false;
    _log.status(result);
    return result;
  },
  toMatch: (expected) => {
    let result = typeof expected === 'string' ? received.includes(expected) : new RegExp(expected).test(received);
    _log.status(result);
    return result;
  },
  toMatchObject: () => {
    let result = _.isMatch(received, expected);
    _log.status(result);
    return result;
  },
  toContain: (expected) => {
    let result;
    if (typeof received === 'string') {
      result = (received.indexOf(String(expected)) !== -1) ? true : false;
    } else if (Array.isArray(received)) {
      let imprint = Array.from(received);
      result = (imprint.indexOf(expected) !== -1) ? true : false;
    }
    _log.status(result);
    return result;
  },
  toHaveLength: (expected) => {
    let result = (received.length == expected) ? true : false;
    _log.status(result);
    return result;
  },
  toHaveProperty: (keyPath, value) => { //new
    if(value){
      result = (object.hasOwnProperty(keyPath, value)) ? true : false;
    } else {
      result = (object.hasOwnProperty(keyPath)) ? true : false;
    }
    _log.status(result);
    return result;
  },
  toThrow: (expected) => {
    // ToDo
  },
  toBeInstanceOf: (expected) => {
    let result = (received instanceof expected) ? true : false;
    _log.status(result);
    return result;
  }
});

module.exports = {
  allMatchers
}