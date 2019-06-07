'use strict';

const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();
const coverage = require('../Utils/coverage.js');

describe('CustomSlider', function() {
  let component;

  before(function() {
    return showroom.start()
        .then(function() {
          return coverage.beforeHook(showroom);
        });
  });

  after(function() {
    return coverage.afterHook(showroom);
  });

  beforeEach(function() {
    return showroom.setTestSubject('custom-slider')
        .then(function(comp) {
          component = comp;
        });
  });

  describe('Testing the attributes of the slider', async () => {
    it('Testing min attributes', async () => {
      await showroom.setAttribute('min', 25);
      const find = await showroom.find('//input', component);
      const minprop = await find.getProperty('min');
      const min = minprop._remoteObject.value;
      assert.deepEqual(min, '25');


      // assert.deepEqual(result.toString(), 'true');
    });
  });
});
