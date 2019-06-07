const jsBlacklistFileName = [
  'component-renderer.js',
  'Slim.js',
  'component-dashboard.js',
  'custom-control-form.js',
  'jsoneditor.min.js',
  'showroom-app.js',
  'showroom-integration.js',
];

const cssBlacklistFileName = [
  '', // For some reason puppeteer include this as css file name
  'main.css',
  'fonts.css',
  'topcoat-desktop-light.css',
  'ace_editor.css',
  'ace-tm',
  'ace_searchbox',
  'topcoat-desktop-light.css',
  'normalize.css',
  'jsoneditor.min.css',
];

const beforeHook = function(showroom) {
  const page = showroom.page;
  return Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage(),
  ]);
};

let ALL_COVERAGES;

const afterHook = function(showroom) {
  const page = showroom.page;
  return Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ])
      .then(function([jsCoverage, cssCoverage]) {
        jsCoverage = filterCoverage(jsCoverage, jsBlacklistFileName);
        cssCoverage = filterCoverage(cssCoverage, cssBlacklistFileName);
        ALL_COVERAGES = ALL_COVERAGES.concat(jsCoverage);
        return showroom.stop();
      });
};

const initCoverage = function() {
  ALL_COVERAGES = [];
};

const writeOutCoverage = function() {
  const pti = require('puppeteer-to-istanbul');
  pti.write(ALL_COVERAGES);
};

const filterCoverage = function(coverages, blacklist) {
  return coverages.filter(function(coverage) {
    // Return true if not on blacklist
    const fileName = extractFileName(coverage['url']);
    return (! blacklist.includes(fileName) );
  });
};

const extractFileName = function(fileName) {
  const splitted = fileName.split('/');
  return splitted[splitted.length - 1];
};

exports.beforeHook = beforeHook;
exports.afterHook = afterHook;
exports.writeOutCoverage = writeOutCoverage;
exports.initCoverage = initCoverage;
