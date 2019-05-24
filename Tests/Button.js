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

  describe('Color of the button', async() => {
    it('Testing background color of the button', async() => {
      //const color = await showroom.getAttribute('background-color')
      //console.log(color)
      await showroom.setAttribute('background-color', 'pink')
      const background_color = await showroom.getAttribute('background-color')
      assert.deepEqual(background_color, 'pink')
    });

    it('Testing border color of the button', async() => {
      await showroom.setAttribute('border-color', 'black')
      const border_color = await showroom.getAttribute('border-color')
      assert.deepEqual(border_color, 'black')
    });
  });

  describe('Font of the button', async() => {
    it('Testing font style of the button', async() => {
      //const color = await showroom.getAttribute('background-color')
      //console.log(color)
      await showroom.setAttribute('font', 'Comic Sans MS')
      const font = await showroom.getAttribute('font')
      assert.deepEqual(font, 'Comic Sans MS')
    });

    it('Testing text color of the button', async() => {
      await showroom.setAttribute('text-color', 'lime')
      const text_color = await showroom.getAttribute('text-color')
      assert.deepEqual(text_color, 'lime')
    });
  });

  describe('href functionality', async() => {
    it('Testing the href', async() => {
      await showroom.setAttribute('href', 'https://stackoverflow.com')
      const get_href = await showroom.getAttribute('href')
      assert.deepEqual(get_href, 'https://stackoverflow.com')
    });

  });

});
