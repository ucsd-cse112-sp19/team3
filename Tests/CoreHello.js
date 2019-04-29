'use strict';

const assert = require('chai').assert;
const showroom = require('showroom/puppeteer')();

describe('CoreHello', function() {
  let component;

  before(function(done) {
    showroom.start()
        .then(function() {
          done();
        });
  });

  after(function(done) {
    showroom.stop()
        .then(function() {
          done();
        });
  });

  beforeEach(function(done) {
    showroom.setTestSubject('core-hello')
        .then(function(comp) {
          component = comp;
          done();
        });
  });

  describe('Slot with different types of content', function() {
    it('should contain text', function(done) {
      showroom.setProperty('innerHTML', `test1`)
          .then(function() {
            return showroom.getTextContent(component);
          })
          .then(function(text) {
            assert.equal(text, 'test1');
            done();
          });
    });

    it('should contain parahraph tag', function(done) {
      showroom.setProperty('innerHTML', `<p>test2</p>`)
          .then(function() {
            return showroom.find('p');
          })
          .then(function(tag) {
            return showroom.getTextContent(tag);
          })
          .then(function(text) {
            assert.equal(text, 'test2');
            done();
          });
    });
  });
});
