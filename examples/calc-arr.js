'use strict';

var avg = require('array-avg');
var sma = require('../');
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('source', arr);

var res = [];
var tmp = [];
var len = arr.length;
var i = -1;
var n = 3;
var center = Math.ceil(n / 2);
var prevAvg;
var calc = sma.calc(n);
while (++i < len) {
  res[i] = 0;
  if (i < (center - 1)) continue;
  if (i > (len - center)) continue;
  if (prevAvg) {
    res[i] = prevAvg = calc(prevAvg, arr[i], arr[i - center]);
  } else {
    res[i] = prevAvg = avg(arr.slice(i - (center - 1), i + center));
  }
}
console.log('results', res);
