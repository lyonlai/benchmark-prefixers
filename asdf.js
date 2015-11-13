var Prefixer = require('inline-style-prefixer');

var prefixer = new Prefixer('Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0');

var prefixer2 = new Prefixer('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2');

var style = {
  display: 'flex',
  flex: 1,
  wordBreak: 'break-all',
  hyphens: 'auto',
  transform: 'rotate(30deg)'
};

var prefixed = prefixer.prefix(style);

var prefixed2 = prefixer2.prefix(style);

console.log(prefixed);
console.log(prefixed2);