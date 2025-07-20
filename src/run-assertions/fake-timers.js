import FakeTimers from '@sinonjs/fake-timers';

let clock = null;

export function useFakeTimers() {
  clock = FakeTimers.install();
}
export function useRealTimers() {
  if (clock) clock.uninstall();
  clock = null;
}
export function advanceTimersByTime(ms) {
  if (clock) clock.tick(ms);
}
export function runAllTimers() {
  if (clock) clock.runAll();
}
export function resetTimers() {
  if (clock) clock.reset();
}
export function getTimerCalls() {
  return clock ? clock.timers : null;
}
export function getTimerCallCount() {
  return clock ? Object.keys(clock.timers).length : 0;
} 