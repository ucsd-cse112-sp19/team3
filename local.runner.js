#!/usr/bin/env node

require('./local.server.js');
const nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');
let bsLocal;

try {
  process.mainModule.filename = './node_modules/.bin/nightwatch';

  // Code to start browserstack local before start of test
  console.log('Connecting local');
  nightwatch.bsLocal = bsLocal = new browserstack.Local();
  bsLocal.start({'key': process.env.BROWSERSTACK_KEY}, function(error) {
    if (error) throw error;

    console.log('Connected. Now testing...');
    nightwatch.cli(function(argv) {
      /* eslint-disable-next-line */
      nightwatch.CliRunner(argv)
          .setup(null, function() {
          // Code to stop browserstack local after end of parallel test
            bsLocal.stop(function() {
              process.exit(0);
            });
          })
          .runTests(function() {
          // Code to stop browserstack local after end of single test
            bsLocal.stop(function() {
              process.exit(0);
            });
          });
    });
  });
} catch (ex) {
  bsLocal.stop();
  console.log('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  process.exit(2);
}
