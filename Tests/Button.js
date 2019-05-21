'use strict';

const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();
const coverage = require('../Utils/coverage.js');

describe('CustomButton', function() {
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
    return showroom.setTestSubject('custom-button')
        .then(function(comp) {
          component = comp;
        });
  });

  describe('Shape of the button', async() => {
    it('Testing rounded shape of the button', async() => {
      await showroom.setAttribute('rounded', 1)
      const shape = await showroom.getAttribute('rounded')
      assert.deepEqual(shape, '1')
    });

    it('Testing circle shape of the button', async() => {
      await showroom.setAttribute('circle', 1)
      const shape = await showroom.getAttribute('circle')
      assert.deepEqual(shape, '1')
    });
  });

});
