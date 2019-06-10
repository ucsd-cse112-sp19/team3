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
    it('Testing min attribute', async () => {
      await showroom.setAttribute('min', 25);
      const find = await showroom.find('//input', component);
      const minprop = await find.getProperty('min');
      const min = minprop._remoteObject.value;
      assert.deepEqual(min, '25');
    });
    it('Testing max attribute', async () => {
      await showroom.setAttribute('max', 200);
      const find = await showroom.find('//input', component);
      const maxprop = await find.getProperty('max');
      const max = maxprop._remoteObject.value;
      assert.deepEqual(max, '200');
    });
    it('Testing step attribute', async () => {
      await showroom.setAttribute('step', 5);
      const find = await showroom.find('//input', component);
      const stepprop = await find.getProperty('step');
      const step = stepprop._remoteObject.value;
      assert.deepEqual(step, '5');
    });
    it('Testing value attribute', async () => {
      await showroom.setAttribute('value', 5);
      const find = await showroom.find('//input', component);
      const valueprop = await find.getProperty('value');
      const value = valueprop._remoteObject.value;
      assert.deepEqual(value, '5');
    });
    it('Testing disable attribute', async () => {
      await showroom.setAttribute('slider-class', 'testClass');
      const obj = await showroom.find('//input', component);
      assert.deepEqual(obj._remoteObject.description, 'input.testClass');
    });
  });
});
