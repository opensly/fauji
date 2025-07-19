// Fauji Fake Timers Implementation
// Provides a Jest-like fake timers API for tests

let _now = 0;
let _timers = [];
let _intervals = [];
let _originals = {};
let _isUsingFakeTimers = false;

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

function useFakeTimers() {
  _installFakeTimers();
}

function useRealTimers() {
  _uninstallFakeTimers();
  resetTimers();
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
  _now = 0;
  _timers = [];
  _intervals = [];
}

module.exports = {
  useFakeTimers,
  useRealTimers,
  advanceTimersByTime,
  runAllTimers,
  resetTimers,
}; 