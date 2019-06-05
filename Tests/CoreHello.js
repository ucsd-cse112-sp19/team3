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

    it('should contain parahraph tag', function() {
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

  describe('Internationalization', async() => {
    it('should be able to display Japanese', async() => {
      await showroom.setAttribute('lang', 'jp')
      const style = await showroom.find('//div', component)
      var text = await showroom.getTextContent(style)
      assert.deepEqual(text, 'Kon\'nichiwa seka ')
    });

    it('should be able to display English', async() => {
      await showroom.setAttribute('lang', '')
      const style = await showroom.find('//div', component)
      var text = await showroom.getTextContent(style)
      assert.deepEqual(text, 'Hello World ')
    });

    it('should be able to display French', async() => {
      await showroom.setAttribute('lang', 'fr')
      const style = await showroom.find('//div', component)
      var text = await showroom.getTextContent(style)
      assert.deepEqual(text, 'Bonjour le monde ')
    });

    it('should be able to display Spanish', async() => {
      await showroom.setAttribute('lang', 'es')
      const style = await showroom.find('//div', component)
      var text = await showroom.getTextContent(style)
      assert.deepEqual(text, 'Hola Mundo ')
    });
  });
  describe('Rainbow', async() => {
    it('Test the rainbow funtionality', async() => {
      await showroom.setAttribute('rainbow', '1')
      const style = await showroom.find('//style', component)
      var text = await showroom.getTextContent(style)
      var result = text.includes("@keyframes rainbow {")
      assert.deepEqual(result.toString(), 'true')
    });
  });
});
