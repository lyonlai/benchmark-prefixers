global.navigator = {
  userAgent: 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; de-de) AppleWebKit/525.28.3 (KHTML, like Gecko) Version/3.2.3 Safari/525.28.3'
};

var Benchmark = require('benchmark');
var Prefixer = require('inline-style-prefixer');
var postCSSJS = require('postcss-js');
var autoPrefixer = require('autoprefixer');
var postCSSPrefixer = postCSSJS.sync([autoPrefixer]);

var userAgents = require('bowser/src/useragents.js').useragents;

var suite = new Benchmark.Suite;

var style = {
  display: 'flex',
  flex: 1,
  wordBreak: 'break-all',
  hyphens: 'auto',
  transform: 'rotate(30deg)'
};

var data = {
  chrome: Object.assign({}, style),
  safari: Object.assign({}, style),
  firefox: Object.assign({}, style),
  opera: Object.assign({}, style),
  ie: Object.assign({}, style),
  all: Object.assign({}, style)
}

var postCSSResult;
var inlinePrefixerResult;

var prefixers = {
  chrome: new Prefixer('Mozilla/5.0 (Linux; Android 4.4.2; Nexus 7 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.99 Safari/537.36'),
  safari: new Prefixer('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'),
  ie: new Prefixer('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)'),
  opera: new Prefixer('Mozilla/5.0 (Linux; Android 4.4.2; Nexus 7 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.72 Safari/537.36 OPR/19.0.1340.69721'),
  firefox: new Prefixer('Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0'),
  all: Prefixer
};

var prefixerResults = {};

suite.add('Auto Prefixer', function() {
    postCSSResult = postCSSPrefixer(style);
  })
  .add('Inline Chrome', function() {
    prefixers.chrome.prefix(data.chrome);
  })
  .add('Inline Safari', function() {
    prefixers.safari.prefix(data.safari);
  })
  .add('Inline IE', function() {
    prefixers.ie.prefix(data.ie);
  })
  .add('Inline Opera', function() {
    prefixers.opera.prefix(data.opera);
  })
  .add('Inline Firefox', function() {
    prefixers.firefox.prefix(data.firefox);
  })
  .add('Inline All Prefixes', function() {
    prefixers.all.prefixAll(data.all);
  })
  .on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  console.log('postCSSResult', postCSSPrefixer(style));
  console.log('inlineCSSResult chrome', data.chrome);
  console.log('inlineCSSResult firefox', data.firefox);
  console.log('inlineCSSResult safari', data.safari);
  console.log('inlineCSSResult ie', data.ie);
  console.log('inlineCSSResult opera', data.opera);
  console.log('inlineCSSResult all', data.all);
})
// run async
.run({ 'async': false });