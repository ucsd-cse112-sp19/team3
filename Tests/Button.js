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
});
