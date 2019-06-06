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
      await showroom.setAttribute('rounded', 1);
      const style = await showroom.find('//style', component);
      const styleTextContent = await showroom.getTextContent(style);
      // test whether "border-radius: 100px;" added to 'style in shadowdom
      const result = styleTextContent.includes('border-radius: 100px;');
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

  describe('Theme', async () => {
    it('Testing the ocean theme', async () => {
      await showroom.setAttribute('theme', 'ocean');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #7fffd4;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the mad-queen theme', async () => {
      await showroom.setAttribute('theme', 'mad-queen');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #dd0000;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the desert theme', async () => {
      await showroom.setAttribute('theme', 'desert');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #a52a2a;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the pink-lemonade theme', async () => {
      await showroom.setAttribute('theme', 'pink-lemonade');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #ff1493;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the forest theme', async () => {
      await showroom.setAttribute('theme', 'forest');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #52ed32;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the ghost theme', async () => {
      await showroom.setAttribute('theme', 'ghost');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #aaaaaa;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the flame theme', async () => {
      await showroom.setAttribute('theme', 'flame');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #ffbb00;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the triton theme', async () => {
      await showroom.setAttribute('theme', 'triton');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('color: #ffd700;');
      assert.deepEqual(result.toString(), 'true');
    });
  });

  describe('disabled functionality', async () => {
    it('Testing the disabled', async () => {
      await showroom.setAttribute('disabled', '');
      const style = await showroom.find('//style', component);
      const text = await showroom.getTextContent(style);
      const result = text.includes('cursor: not-allowed;');
      assert.deepEqual(result.toString(), 'true');
    });
  });
});
