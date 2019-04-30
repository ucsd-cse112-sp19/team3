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
});
