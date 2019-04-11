console.log = console.info = console.debug = console.error = function () {};

// const GATEKEEPER_KEY = '82fe014b6575b8c38b44235580bc8b11';
var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/rbrtmrtn/mapboard-base-config@d9892943dc4df94ba2b1e51dbe2aeb0b0bcd4aab/config.js';

Pictometry.default({
  baseConfig: BASE_CONFIG_URL,
  pictometry: {
    enabled: true
  }
});
