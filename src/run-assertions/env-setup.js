// Environment setup for Fauji
function setupJsdomIfNeeded(options) {
  if (options.env === 'jsdom') {
    try {
      const { JSDOM } = require('jsdom');
      const dom = new JSDOM('<!doctype html><html><body></body></html>');
      global.window = dom.window;
      global.document = dom.window.document;
      global.navigator = dom.window.navigator;
      Object.getOwnPropertyNames(dom.window).forEach((prop) => {
        if (!(prop in global)) {
          global[prop] = dom.window[prop];
        }
      });
      console.log('jsdom environment set up.');
    } catch (e) {
      console.error('jsdom is not installed. Run `npm install jsdom` to use the jsdom environment.');
      process.exit(1);
    }
  }
}

module.exports = { setupJsdomIfNeeded }; 