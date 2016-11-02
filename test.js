'use strict';

require('mocha');
var assert = require('assert');
var sma = require('./');

describe('simple-moving-avg', function() {
  it('should export a function', function() {
    assert.equal(typeof sma, 'function');
    assert.equal(typeof sma.center, 'function');
    assert.equal(typeof sma.calc, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      sma();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be an array');
      cb();
    }
  });

  it('should calculate the simple moving average for an array of elements', function() {
    assert.deepEqual(sma([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3), [0, 0, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should calculate the simple moving average for an array of elements centered around the index when true is passed', function() {
    assert.deepEqual(sma([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, true), [0, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  });

  it('should calculate the simple moving average for an array of elements centered around the index using the `.center` function', function() {
    assert.deepEqual(sma.center([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3), [0, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  });
});
