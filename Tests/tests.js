'use strict';

const coverage = require('../Utils/coverage.js');

describe('All Tests', function() {
  before(function() {
    coverage.initCoverage();
  });

  require('./CoreHello');
  require('./Button');
  require('./Popover');
  require('./Slider');

  after(function() {
    coverage.writeOutCoverage();
  });
});
