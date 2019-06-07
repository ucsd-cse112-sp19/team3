'use strict';

const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();
const coverage = require('../Utils/coverage.js');

describe('CustomPopover', function() {
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
          // const component = comp; (Unused, commented out for linter)
        });
  });

  describe('Color and font', async () => {
    it('Testing the color of the popup', async () => {
      await showroom.setAttribute('color', 'pink');
      const color = await showroom.getProperty('color');
      assert.deepEqual(color, 'pink');
    });

    it('Testing the color of the popup text', async () => {
      await showroom.setAttribute('text-color', 'brown');
      const color = await showroom.getProperty('textColor');
      assert.deepEqual(color, 'brown');
    });

    it('Testing the font of the popup', async () => {
      await showroom.setAttribute('font', 'Courier New');
      const font = await showroom.getProperty('font');
      assert.deepEqual(font, 'Courier New');
    });
  });

  describe('placement', async () => {
    it('Testing the top placement of the popup', async () => {
      await showroom.setAttribute('placement', 'top');
      const find = await showroom.find('//style');
      const text = await showroom.getTextContent(find);
      const result = text.includes('top: 100%;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the bottom placement of the popup', async () => {
      await showroom.setAttribute('placement', 'bottom');
      const find = await showroom.find('//style');
      const text = await showroom.getTextContent(find);
      const result = text.includes('bottom: 100%;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the left placement of the popup', async () => {
      await showroom.setAttribute('placement', 'left');
      const find = await showroom.find('//style');
      const text = await showroom.getTextContent(find);
      const result = text.includes('left: 100%;');
      assert.deepEqual(result.toString(), 'true');
    });

    it('Testing the right placement of the popup', async () => {
      await showroom.setAttribute('placement', 'right');
      const find = await showroom.find('//style');
      const text = await showroom.getTextContent(find);
      const result = text.includes('right: 100%;');
      assert.deepEqual(result.toString(), 'true');
    });
  });

  describe('anchor', async () => {
    it('Testing popover anchor', async () => {
      await showroom.setAttribute('anchor', 'default-btn');
      const anchor = await showroom.getProperty('anchor');
      assert.deepEqual(anchor, 'default-btn');
    });
  });

  describe('bootstrap', async () => {
    it('Testing bootstrap support', async () => {
      await showroom.setAttribute('class', 'btn-primary');
      const style = await showroom.find('//style');
      const text = await showroom.getTextContent(style);
      const result = text.includes('--arrow-color: #007bff');
      assert.deepEqual(result.toString(), 'true');
    });
  });
});
