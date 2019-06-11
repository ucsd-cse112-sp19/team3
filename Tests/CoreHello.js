'use strict';

const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();
const coverage = require('../Utils/coverage.js');

describe('CoreHello', function() {
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
    return showroom.setTestSubject('core-hello')
        .then(function(comp) {
          component = comp;
        });
  });

  describe('Slot with different types of content', function() {
    it('should contain text', function() {
      return showroom.setProperty('innerHTML', `test1`)
          .then(function() {
            return showroom.getTextContent(component);
          })
          .then(function(text) {
            assert.equal(text, 'test1');
          });
    });

    it('should contain paragraph tag', function() {
      return showroom.setProperty('innerHTML', `<p>test2</p>`)
          .then(function() {
            return showroom.find('p');
          })
          .then(function(tag) {
            return showroom.getTextContent(tag);
          })
          .then(function(text) {
            assert.equal(text, 'test2');
          });
    });
  });

  describe('Internationalization', async () => {
    it('should be able to display Japanese', async () => {
      await showroom.setAttribute('lang', 'jp');
      const style = await showroom.find('//div', component);
      const text = await showroom.getTextContent(style);
      assert.deepEqual(text, 'Kon\'nichiwa sekai ');
    });

    it('should be able to display English', async () => {
      await showroom.setAttribute('lang', '');
      const style = await showroom.find('//div', component);
      const text = await showroom.getTextContent(style);
      assert.deepEqual(text, 'Hello World ');
    });

    it('should be able to display French', async () => {
      await showroom.setAttribute('lang', 'fr');
      const style = await showroom.find('//div', component);
      const text = await showroom.getTextContent(style);
      assert.deepEqual(text, 'Bonjour le monde ');
    });

    it('should be able to display Spanish', async () => {
      await showroom.setAttribute('lang', 'es');
      const style = await showroom.find('//div', component);
      const text = await showroom.getTextContent(style);
      assert.deepEqual(text, 'Hola Mundo ');
    });
  });
  describe('Rainbow', async () => {
    it('Test the rainbow functionality', async () => {
      await showroom.setAttribute('rainbow', '1');
      const obj = await showroom.find('//div', component);
      assert.deepEqual(obj._remoteObject.description, 'div.rainbow');
    });
  });
  describe('Style and css importing', async () => {
    it('Test classes properly importing', async () => {
      await showroom.setAttribute('class', 'testClass');
      const obj = await showroom.find('//div', component);
      assert.deepEqual(obj._remoteObject.description, 'div.testClass');
    });
    it('Test styles properly importing', async () => {
      await showroom.setAttribute('style', 'color: blue;');
      const obj = await showroom.find('//div', component);
      const styling = await showroom.getAttribute('style', obj);
      assert.deepEqual(styling, 'color: blue;');
    });
  });
  describe('Slot and greeting combined', function() {
    it('should be able to display Japanese', async () => {
      await showroom.setAttribute('lang', 'jp');
      const style = await showroom.find('//div', component);
      const greeting = await showroom.getTextContent(style);
      await showroom.setProperty('innerHTML', `test1`);
      const slot = await showroom.getTextContent(component);
      assert.deepEqual('Kon\'nichiwa sekai test1', greeting + slot);
    });
  });
});
