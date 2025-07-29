import { JSDOM } from 'jsdom';

export function setupJsdomIfNeeded(options) {
  if (options.env === 'jsdom') {
    const dom = new JSDOM('<!doctype html><html><body></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;
    global.HTMLElement = dom.window.HTMLElement;
    global.Node = dom.window.Node;
    global.Event = dom.window.Event;
    global.CustomEvent = dom.window.CustomEvent;
    global.getComputedStyle = dom.window.getComputedStyle;
  }
}
