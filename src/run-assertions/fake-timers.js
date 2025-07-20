// Fauji Fake Timers Implementation (using @sinonjs/fake-timers like Vitest)

const FakeTimers = require('@sinonjs/fake-timers');
let clock = null;

function useFakeTimers() {
  if (!clock) {
    clock = FakeTimers.install({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval',
        'Date',
        'nextTick',
        'setImmediate',
        'clearImmediate',
      ],
      now: Date.now(),
      shouldAdvanceTime: false,
      advanceTimeDelta: 20,
    });
  }
}

function useRealTimers() {
  if (clock) {
    clock.uninstall();
    clock = null;
  }
}

function advanceTimersByTime(ms) {
  if (!clock) throw new Error('Fake timers not in use');
  clock.tick(ms);
}

function runAllTimers() {
  if (!clock) throw new Error('Fake timers not in use');
  clock.runAll();
}

function resetTimers() {
  if (clock) {
    clock.reset();
  }
}

// For compatibility with previous API (spies, etc.)
function getTimerCalls(fnName) {
  // Not directly supported by @sinonjs/fake-timers; return [] for compatibility
  return [];
}

function getTimerCallCount(fnName) {
  return 0;
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