'use strict';

const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();
const coverage = require('../Utils/coverage.js');

describe('CustomPopover', function(){
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
    return showroom.setTestSubject('custom-popover')
        .then(function(comp) {
          component = comp;
        });
  });

  describe('Color and font', async() => {
    it('Testing the color of the popup', async() => {
      await showroom.setAttribute('color', 'pink')
      const color = await showroom.getProperty('color')
      assert.deepEqual(color, 'pink')
    });

    it('Testing the color of the popup text', async() => {
      await showroom.setAttribute('text-color', 'brown')
      const color = await showroom.getProperty('textColor')
      assert.deepEqual(color, 'brown')
    });

    it('Testing the font of the popup', async() => {
      await showroom.setAttribute('font', 'Courier New')
      const font = await showroom.getProperty('font')
      assert.deepEqual(font, 'Courier New')
    });
  });
  
});
