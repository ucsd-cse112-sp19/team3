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
      var find = await showroom.find('//input', component);
      var minprop = await find.getProperty('min');
      var min = minprop._remoteObject.value;
      assert.deepEqual(min, '25');
      await showroom.setAttribute('min', 50);
      find = await showroom.find('//input', component);
      minprop = await find.getProperty('min');
      min = minprop._remoteObject.value;
      assert.deepEqual(min, '50');
    });
    it('Testing max attribute', async () => {
      await showroom.setAttribute('max', 200);
      var find = await showroom.find('//input', component);
      var maxprop = await find.getProperty('max');
      var max = maxprop._remoteObject.value;
      assert.deepEqual(max, '200');
      await showroom.setAttribute('max', 500);
      find = await showroom.find('//input', component);
      maxprop = await find.getProperty('max');
      max = maxprop._remoteObject.value;
      assert.deepEqual(max, '500');
    });
    it('Testing step attribute', async () => {
      await showroom.setAttribute('step', 5);
      var find = await showroom.find('//input', component);
      var stepprop = await find.getProperty('step');
      var step = stepprop._remoteObject.value;
      assert.deepEqual(step, '5');
      await showroom.setAttribute('step', 8);
      find = await showroom.find('//input', component);
      stepprop = await find.getProperty('step');
      step = stepprop._remoteObject.value;
      assert.deepEqual(step, '8');
    });
    it('Testing value attribute', async () => {
      await showroom.setAttribute('value', 5);
      var find = await showroom.find('//input', component);
      var valueprop = await find.getProperty('value');
      var value = valueprop._remoteObject.value;
      assert.deepEqual(value, '5');
      await showroom.setAttribute('value', 8);
      find = await showroom.find('//input', component);
      valueprop = await find.getProperty('value');
      value = valueprop._remoteObject.value;
      assert.deepEqual(value, '8');
    });
    it('Testing disable attribute', async () => {
      await showroom.setAttribute('slider-class', 'testClass');
      var obj = await showroom.find('//input', component);
      assert.deepEqual(obj._remoteObject.description, 'input.testClass');
      await showroom.setAttribute('slider-class', 'test2');
      obj = await showroom.find('//input', component);
      assert.deepEqual(obj._remoteObject.description, 'input.test2');
    });
  });
});
