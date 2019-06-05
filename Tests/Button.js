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
      const style = await showroom.find('//style', component)
      var style_text_content = await showroom.getTextContent(style)
      var result = style_text_content.includes("border-radius: 100px;")    //test whether it added "border-radius: 100px;" to the 'style in shawdow, if yes, return true
      assert.deepEqual(result.toString(), 'true')
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
      const background_color = await showroom.getProperty('backgroundColor')
      assert.deepEqual(background_color, 'pink')
    });

    it('Testing border color of the button', async() => {
      await showroom.setAttribute('border-color', 'black')
      const border_color = await showroom.getProperty('borderColor')
      assert.deepEqual(border_color, 'black')
    });
  });

  describe('Font of the button', async() => {
    it('Testing font style of the button', async() => {
      await showroom.setAttribute('font', 'Comic Sans MS')
      const font = await showroom.getProperty('font')
      assert.deepEqual(font, 'Comic Sans MS')
    });

    it('Testing text color of the button', async() => {
      await showroom.setAttribute('text-color', 'lime')
      const text_color = await showroom.getProperty('textColor')
      assert.deepEqual(text_color, 'lime')
    });
  });

  describe('href functionality', async() => {
    it('Testing the href', async() => {
      await showroom.setAttribute('href', 'https://stackoverflow.com')
      const get_href = await showroom.getAttribute('href')
      const test = await showroom.getProperty('href')
      console.log(test)
      assert.deepEqual(get_href, 'https://stackoverflow.com')
    });

  });

});
