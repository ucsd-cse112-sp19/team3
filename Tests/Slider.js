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
      //await showroom.setAttribute('min', 1);
      //const find = await showroom.find('//input', component);
      //const text = await showroom.getProperty(find);
      
      

      console.log(await showroom.getAttribute('min'));
        
      
      //assert.deepEqual(result.toString(), 'true');
    });

    
  });
});