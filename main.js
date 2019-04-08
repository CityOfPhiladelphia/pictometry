console.log = console.info = console.debug = console.error = function () {};

// const GATEKEEPER_KEY = '82fe014b6575b8c38b44235580bc8b11';
var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/ajrothwell/mapboard-base-config@f1802a4bef28265e2add0e94ce823852a5341ad6/config.js';

Pictometry.default({
  baseConfig: BASE_CONFIG_URL,
  pictometry: {
    enabled: true
  }
});
