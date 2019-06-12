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

  describe('Shape of the button', async () => {
    it('Testing rounded shape of the button', async () => {
      let style = await showroom.find('//style', component);
      let styleTextContent = await showroom.getTextContent(style);
      let result = styleTextContent.includes('border-radius: 100px;');
      assert.deepEqual(result.toString(), 'false');
      await showroom.setAttribute('rounded', 1);
      style = await showroom.find('//style', component);
      styleTextContent = await showroom.getTextContent(style);
      result = styleTextContent.includes('border-radius: 100px;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing circle shape of the button', async () => {
      await showroom.setAttribute('circle', 1);
      const style = await showroom.find('//style', component);
      const styleTextContent = await showroom.getTextContent(style);
      const width = styleTextContent.includes('width: 70px;');
      const height = styleTextContent.includes('height: 70px;');
      const borderRadius = styleTextContent.includes('border-radius: 100%;');
      const result = (borderRadius & width & height).toString();
      assert.deepEqual(result, '1');
    });
  });

  describe('Color of the button', async () => {
    it('Testing background color of the button', async () => {
      // const color = await showroom.getAttribute('background-color')
      // console.log(color)
      await showroom.setAttribute('background-color', 'pink');
      const backgroundColor = await showroom.getProperty('backgroundColor');
      assert.deepEqual(backgroundColor, 'pink');
    });

    it('Testing border color of the button', async () => {
      await showroom.setAttribute('border-color', 'black');
      const borderColor = await showroom.getProperty('borderColor');
      assert.deepEqual(borderColor, 'black');
    });
  });

  describe('Test all getters and setters', async () => {
    it('Testing get/set background color', async () => {
      await showroom.setProperty('backgroundColor', 'pink');
      const prop = await showroom.getProperty('backgroundColor');
      assert.deepEqual(prop, 'pink');
    });

    it('Testing get/set border color', async () => {
      await showroom.setProperty('borderColor', 'black');
      const prop = await showroom.getProperty('borderColor');
      assert.deepEqual(prop, 'black');
    });

    it('Testing get/set style', async () => {
      await showroom.setProperty('style', 'color: brown;');
      const prop = await showroom.getProperty('style');
      assert.deepEqual(prop, 'color: brown;');
    });

    it('Testing get/set text color', async () => {
      await showroom.setProperty('textColor', 'red');
      const prop = await showroom.getProperty('textColor');
      assert.deepEqual(prop, 'red');
    });

    it('Testing get/set font', async () => {
      await showroom.setProperty('font', 'Comic Sans');
      const prop = await showroom.getProperty('font');
      assert.deepEqual(prop, 'Comic Sans');
    });

    it('Testing get/set width', async () => {
      await showroom.setProperty('width', '10px');
      const prop = await showroom.getProperty('width');
      assert.deepEqual(prop, '10px');
    });

    it('Testing get/set height', async () => {
      await showroom.setProperty('height', '20px');
      const prop = await showroom.getProperty('height');
      assert.deepEqual(prop, '20px');
    });

    it('Testing get/set hover text color', async () => {
      await showroom.setProperty('hoverTextColor', 'black');
      const prop = await showroom.getProperty('hoverTextColor');
      assert.deepEqual(prop, 'black');
    });

    it('Testing get/set hover border color', async () => {
      await showroom.setProperty('hoverBorderColor', 'red');
      const prop = await showroom.getProperty('hoverBorderColor');
      assert.deepEqual(prop, 'red');
    });

    it('Testing get/set hover bg color', async () => {
      await showroom.setProperty('hoverBackgroundColor', 'black');
      const prop = await showroom.getProperty('hoverBackgroundColor');
      assert.deepEqual(prop, 'black');
    });

    it('Testing get/set active text color', async () => {
      await showroom.setProperty('activeTextColor', 'red');
      const prop = await showroom.getProperty('activeTextColor');
      assert.deepEqual(prop, 'red');
    });

    it('Testing get/set active bg color', async () => {
      await showroom.setProperty('activeBackgroundColor', 'pink');
      const prop = await showroom.getProperty('activeBackgroundColor');
      assert.deepEqual(prop, 'pink');
    });

    it('Testing get/set active border color', async () => {
      await showroom.setProperty('activeBorderColor', 'blue');
      const prop = await showroom.getProperty('activeBorderColor');
      assert.deepEqual(prop, 'blue');
    });

    it('Testing get/set rounded', async () => {
      await showroom.setProperty('rounded', true);
      const prop = await showroom.getProperty('rounded');
      assert.deepEqual(prop, 'true');
    });

    it('Testing get/set circle', async () => {
      await showroom.setProperty('circle', true);
      const prop = await showroom.getProperty('circle');
      assert.deepEqual(prop, 'true');
    });

    it('Testing get/set disabled', async () => {
      await showroom.setProperty('disabled', true);
      const prop = await showroom.getProperty('disabled');
      assert.deepEqual(prop, 'true');
    });

    it('Testing get/set href', async () => {
      await showroom.setProperty('href', 'stackoverflow.com');
      const prop = await showroom.getProperty('href');
      assert.deepEqual(prop, 'stackoverflow.com');
    });

    it('Testing get/set class', async () => {
      await showroom.setProperty('class', 'testclass');
      const prop = await showroom.getProperty('class');
      assert.deepEqual(prop, 'testclass');
    });
  });

  describe('Height and width', async () => {
    it('Testing width of the button', async () => {
      await showroom.setAttribute('width', '120px');
      const style = await showroom.find('//style', component);
      const styleTextContent = await showroom.getTextContent(style);
      const width = styleTextContent.includes('width: 120px;');
      assert.deepEqual(width, true);
    });

    it('Testing height of the button', async () => {
      await showroom.setAttribute('height', '120px');
      const style = await showroom.find('//style', component);
      const styleTextContent = await showroom.getTextContent(style);
      const height = styleTextContent.includes('height: 120px;');
      assert.deepEqual(height, true);
    });
  });

  describe('Font of the button', async () => {
    it('Testing font style of the button', async () => {
      await showroom.setAttribute('font', 'Comic Sans MS');
      const font = await showroom.getProperty('font');
      assert.deepEqual(font, 'Comic Sans MS');
    });

    it('Testing text color of the button', async () => {
      await showroom.setAttribute('text-color', 'lime');
      const textColor = await showroom.getProperty('textColor');
      assert.deepEqual(textColor, 'lime');
    });
  });

  describe('href functionality', async () => {
    it('Testing the href', async () => {
      await showroom.setAttribute('href', 'https://stackoverflow.com');
      const getHref = await showroom.getAttribute('href');
      assert.deepEqual(getHref, 'https://stackoverflow.com');
    });
  });

  describe('disabled functionality', async () => {
    it('Testing the disabled', async () => {
      let style = await showroom.find('//style', component);
      let text = await showroom.getTextContent(style);
      let result = text.includes('cursor: not-allowed;');
      assert.deepEqual(result.toString(), 'false');
      await showroom.setAttribute('disabled');
      style = await showroom.find('//style', component);
      text = await showroom.getTextContent(style);
      result = text.includes('cursor: not-allowed;');
      assert.deepEqual(result.toString(), 'true');
    });
  });

  describe('Attribute list checks', function() {
    it('should be able to return expected attributes', async () => {
      const result = await showroom.utils.page.evaluate(function(target) {
        const obAttr = target.constructor.observedAttributes;
        const expAttr = [
          'style',
          'text-color',
          'background-color',
          'border-color',
          'font',
          'width',
          'height',
          'hover-text-color',
          'hover-background-color',
          'hover-border-color',
          'active-text-color',
          'active-background-color',
          'active-border-color',
          'rounded',
          'circle',
          'disabled',
          'href',
        ];
        return (JSON.stringify(obAttr) === JSON.stringify(expAttr));
      }, component);
      assert(result === true);
    });
  });
});
