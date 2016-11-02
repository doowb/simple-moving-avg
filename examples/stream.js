'use strict';

var miss = require('mississippi');
var avg = require('array-avg');
var sma = require('../');

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var prev, subset = [];
var n = 3;
var calc = sma.calc(n);

var stream = fromArray(arr);
stream.on('data', function(data) {

  // add data to the subset
  subset.push(data.val);

  // if the previous average has already been calculated
  // use that and the current value to get the current average
  if (prev) {

    prev = calc(prev, data.val, subset.shift());
    console.log(data.i + ':', prev);
  } else if (subset.length === n) {

    // the subset has enough information to calculate an average
    prev = avg(subset);
    console.log(data.i + ':', prev);
  } else {

    // not enough information to calculate an average, just output 0
    console.log(data.i + ':', 'No average yet');
  }
});

stream.on('error', console.log);
stream.on('end', console.log.bind(console, 'end'));

function fromArray(arr) {
  var len = arr.length;
  var i = -1;
  return miss.from.obj(function(size, next) {
    if (++i >= len) return next(null, null);
    setTimeout(function() {
      next(null, {i: i, val: arr[i]});
    }, 200);
  });
}
