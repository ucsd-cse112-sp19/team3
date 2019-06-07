'use strict';

const coverage = require('../Utils/coverage.js');

describe('All Tests', function() {
  before(function() {
    coverage.initCoverage();
  });

  require('./CoreHello');
  require('./Button');
  require('./Popover');

  after(function() {
    coverage.writeOutCoverage();
  });
});
