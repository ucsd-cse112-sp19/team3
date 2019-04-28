const assert = require('chai').assert;
const sinon = require('sinon');

/* dummy test */
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

/** testing function for sinon
 * @param {fn} fn is a test parameter
 * @return {string}
 */
function once(fn) {
  let returnValue; let called = false;
  return function() {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, rest);
    }
    return returnValue;
  };
}

it('calls the original function', function() {
  const callback = sinon.fake();
  const proxy = once(callback);

  proxy();

  assert(callback.called);
});
