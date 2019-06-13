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

  describe('Test all getters and setters', async () => {
    it('Testing get/set min', async () => {
      await showroom.setProperty('min', '2');
      const prop = await showroom.getProperty('min');
      assert.deepEqual(prop, '2');
    });

    it('Testing get/set max', async () => {
      await showroom.setProperty('max', '50');
      const prop = await showroom.getProperty('max');
      assert.deepEqual(prop, '50');
    });

    it('Testing get/set step', async () => {
      await showroom.setProperty('step', '3');
      const prop = await showroom.getProperty('step');
      assert.deepEqual(prop, '3');
    });

    it('Testing get/set value', async () => {
      await showroom.setProperty('value', '45');
      const prop = await showroom.getProperty('value');
      assert.deepEqual(prop, '45');
    });

    it('Testing get/set readonly', async () => {
      await showroom.setProperty('readonly', true);
      const prop = await showroom.getProperty('readonly');
      assert.deepEqual(prop, true);
    });

    it('Testing get/set required', async () => {
      await showroom.setProperty('required', true);
      const prop = await showroom.getProperty('required');
      assert.deepEqual(prop, true);
    });

    it('Testing get/set showinput', async () => {
      await showroom.setProperty('showinput', true);
      const prop = await showroom.getProperty('showinput');
      assert.deepEqual(prop, true);
    });

    it('Testing get/set onChange', async () => {
      await showroom.setProperty('onChange', '1');
      const prop = await showroom.getProperty('onChange');
      assert.deepEqual(prop, '1');
    });

    it('Testing get/set disabled', async () => {
      await showroom.setProperty('disabled', true);
      const prop = await showroom.getProperty('disabled');
      assert.deepEqual(prop, true);
    });

    it('Testing get/set slider-class', async () => {
      await showroom.setProperty('slider-class', 'testclass');
      const prop = await showroom.getProperty('slider-class');
      assert.deepEqual(prop, 'testclass');
    });

    it('Testing get/set input-class', async () => {
      await showroom.setProperty('input-class', 'testclass');
      const prop = await showroom.getProperty('input-class');
      assert.deepEqual(prop, 'testclass');
    });
  });

  describe('Testing has attributes of the tagAttributes', async () => {
    it('Testing has disabled attribute', async () => {
      await showroom.setAttribute('disabled', 1);
      const has = await showroom.hasAttribute('disabled');
      assert.deepEqual(has.toString(), 'true');
    });
    it('Testing has disabled attribute', async () => {
      await showroom.setAttribute('readonly', 1);
      const has = await showroom.hasAttribute('readonly');
      assert.deepEqual(has.toString(), 'true');
    });
    it('Testing has disabled attribute', async () => {
      await showroom.setAttribute('required', 1);
      const has = await showroom.hasAttribute('required');
      assert.deepEqual(has.toString(), 'true');
    });
  });

  describe('Testing showinput', async () => {
    it('Testing has showinput attribute', async () => {
      await showroom.setAttribute('showinput', 1);
      const has = await showroom.hasAttribute('showinput');
      assert.deepEqual(has.toString(), 'true');
    });
  });

  describe('Testing the attributes of the slider', async () => {
    it('Testing min attribute', async () => {
      await showroom.setAttribute('min', 25);
      let find = await showroom.find('//input', component);
      let minprop = await find.getProperty('min');
      let min = minprop._remoteObject.value;
      assert.deepEqual(min, '25');
      await showroom.setAttribute('min', 50);
      find = await showroom.find('//input', component);
      minprop = await find.getProperty('min');
      min = minprop._remoteObject.value;
      assert.deepEqual(min, '50');
    });
    it('Testing max attribute', async () => {
      await showroom.setAttribute('max', 200);
      let find = await showroom.find('//input', component);
      let maxprop = await find.getProperty('max');
      let max = maxprop._remoteObject.value;
      assert.deepEqual(max, '200');
      await showroom.setAttribute('max', 500);
      find = await showroom.find('//input', component);
      maxprop = await find.getProperty('max');
      max = maxprop._remoteObject.value;
      assert.deepEqual(max, '500');
    });
    it('Testing step attribute', async () => {
      await showroom.setAttribute('step', 5);
      let find = await showroom.find('//input', component);
      let stepprop = await find.getProperty('step');
      let step = stepprop._remoteObject.value;
      assert.deepEqual(step, '5');
      await showroom.setAttribute('step', 8);
      find = await showroom.find('//input', component);
      stepprop = await find.getProperty('step');
      step = stepprop._remoteObject.value;
      assert.deepEqual(step, '8');
    });
    it('Testing value attribute', async () => {
      await showroom.setAttribute('value', 5);
      let find = await showroom.find('//input', component);
      let valueprop = await find.getProperty('value');
      let value = valueprop._remoteObject.value;
      assert.deepEqual(value, '5');
      await showroom.setAttribute('value', 8);
      find = await showroom.find('//input', component);
      valueprop = await find.getProperty('value');
      value = valueprop._remoteObject.value;
      assert.deepEqual(value, '8');
    });
    it('Testing disable attribute', async () => {
      await showroom.setAttribute('slider-class', 'testClass');
      let obj = await showroom.find('//input', component);
      assert.deepEqual(obj._remoteObject.description, 'input.testClass');
      await showroom.setAttribute('slider-class', 'test2');
      obj = await showroom.find('//input', component);
      assert.deepEqual(obj._remoteObject.description, 'input.test2');
    });
    it('Testing input-class attribute', async () => {
      await showroom.setAttribute('input-class', '1');
      const has = await showroom.hasAttribute('input-class');
      assert.deepEqual(has.toString(), 'true');
    });
    it('Testing onchange attribute', async () => {
      const page = showroom.page;
      // Set initial value
      await showroom.setAttribute('value', '50');
      // Setup onchange hook
      await page.evaluate(function() {
        document._onchange = 0;
        /* eslint-disable-next-line */
        function _test_on_change(value) {
          document._onchange = value;
        }
        /* eslint-disable-next-line */
        window['_test_on_change'] = _test_on_change;
      });
      // Apply onchange hook
      await showroom.utils.page.evaluate(function(target) {
        target.setAttribute('onchange', '_test_on_change');
      }, component);
      // Set value to new number
      await showroom.setAttribute('value', '51');
      // Retrieve updated value
      const newValue = await page.evaluate(function() {
        return document._onchange;
      });
      assert.equal(newValue, 51);
    });
  });

  describe('Attribute list checks', function() {
    it('should be able to return observed attributes', async () => {
      const result = await showroom.utils.page.evaluate(function(target) {
        const obAttr = target.constructor.observedAttributes;
        const expAttr = [
          'min',
          'max',
          'step',
          'value',
          'slider-class',
          'input-class',
          'showinput',
          'onchange',
          'disabled',
          'readonly',
          'required',
        ];
        return (JSON.stringify(obAttr) === JSON.stringify(expAttr));
      }, component);
      assert(result === true);
    });
    it('should be able to return custom attributes', async () => {
      const result = await showroom.utils.page.evaluate(function(target) {
        const cuAttr = target.constructor.customAttributes;
        const expAttr = [
          'slider-class',
          'input-class',
          'showinput',
          'onchange',
        ];
        return (JSON.stringify(cuAttr) === JSON.stringify(expAttr));
      }, component);
      assert(result === true);
    });
  });
});
