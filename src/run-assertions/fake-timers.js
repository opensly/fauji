// Fauji Fake Timers Implementation
// Provides a Jest-like fake timers API for tests

const spy = require('../matchers/spy');

let _now = 0;
let _timers = [];
let _intervals = [];
let _originals = {};
let _isUsingFakeTimers = false;

let _timerSpies = {};

function _mockDate(...args) {
  if (args.length === 0) return new _originals.Date(_now);
  return new _originals.Date(...args);
}

function _installFakeTimers() {
  if (_isUsingFakeTimers) return;
  _originals.setTimeout = global.setTimeout;
  _originals.setInterval = global.setInterval;
  _originals.clearTimeout = global.clearTimeout;
  _originals.clearInterval = global.clearInterval;
  _originals.Date = global.Date;

  global.setTimeout = (fn, delay = 0, ...args) => {
    const id = Symbol('timeout');
    _timers.push({ id, fn, time: _now + delay, args, cleared: false });
    return id;
  };
  global.clearTimeout = (id) => {
    const t = _timers.find(t => t.id === id);
    if (t) t.cleared = true;
  };
  global.setInterval = (fn, delay = 0, ...args) => {
    const id = Symbol('interval');
    _intervals.push({ id, fn, delay, next: _now + delay, args, cleared: false });
    return id;
  };
  global.clearInterval = (id) => {
    const i = _intervals.find(i => i.id === id);
    if (i) i.cleared = true;
  };
  global.Date = function(...args) {
    if (this instanceof global.Date) {
      if (args.length === 0) return new _originals.Date(_now);
      return new _originals.Date(...args);
    }
    return new _originals.Date(_now).toString();
  };
  global.Date.now = () => _now;
  _isUsingFakeTimers = true;
}

function _uninstallFakeTimers() {
  if (!_isUsingFakeTimers) return;
  global.setTimeout = _originals.setTimeout;
  global.setInterval = _originals.setInterval;
  global.clearTimeout = _originals.clearTimeout;
  global.clearInterval = _originals.clearInterval;
  global.Date = _originals.Date;
  _isUsingFakeTimers = false;
}

function _spyOnTimers() {
  _timerSpies.setTimeout = spy.spyOn(global, 'setTimeout');
  _timerSpies.setInterval = spy.spyOn(global, 'setInterval');
  _timerSpies.clearTimeout = spy.spyOn(global, 'clearTimeout');
  _timerSpies.clearInterval = spy.spyOn(global, 'clearInterval');
}

function _restoreTimerSpies() {
  Object.values(_timerSpies).forEach(s => s && s.restore && s.restore());
  _timerSpies = {};
}

function getTimerCalls(fnName) {
  if (_timerSpies[fnName] && _timerSpies[fnName].mock) {
    return _timerSpies[fnName].mock.calls;
  }
  return [];
}

function getTimerCallCount(fnName) {
  return getTimerCalls(fnName).length;
}

// Patch useFakeTimers/useRealTimers/resetTimers to integrate spies
const _origUseFakeTimers = useFakeTimers;
const _origUseRealTimers = useRealTimers;
const _origResetTimers = resetTimers;

function useFakeTimers() {
  _origUseFakeTimers();
  _spyOnTimers();
}

function useRealTimers() {
  _origUseRealTimers();
  _restoreTimerSpies();
}

function advanceTimersByTime(ms) {
  if (!_isUsingFakeTimers) throw new Error('Fake timers not in use');
  _now += ms;
  // Run timeouts
  _timers.filter(t => !t.cleared && t.time <= _now).forEach(t => {
    t.cleared = true;
    t.fn(...t.args);
  });
  // Remove executed timeouts
  _timers = _timers.filter(t => !t.cleared);
  // Run intervals
  _intervals.forEach(i => {
    while (!i.cleared && i.next <= _now) {
      i.fn(...i.args);
      i.next += i.delay;
    }
  });
}

function runAllTimers() {
  if (!_isUsingFakeTimers) throw new Error('Fake timers not in use');
  // Run all timeouts and intervals until none left
  let ran;
  do {
    ran = false;
    // Run all timeouts
    _timers.filter(t => !t.cleared && t.time <= _now).forEach(t => {
      t.cleared = true;
      t.fn(...t.args);
      ran = true;
    });
    _timers = _timers.filter(t => !t.cleared);
    // Run all intervals
    _intervals.forEach(i => {
      if (!i.cleared && i.next <= _now) {
        i.fn(...i.args);
        i.next += i.delay;
        ran = true;
      }
    });
  } while (ran);
}

function resetTimers() {
  _origResetTimers();
  _restoreTimerSpies();
}

module.exports = {
  useFakeTimers,
  useRealTimers,
  advanceTimersByTime,
  runAllTimers,
  resetTimers,
  getTimerCalls,
  getTimerCallCount,
}; 