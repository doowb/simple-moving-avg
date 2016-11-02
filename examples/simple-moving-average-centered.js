'use strict';

var sma = require('../');
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('source', arr);
console.log('results `sma(arr, 3, true)`', sma(arr, 3, true));
console.log('results `sma.center(arr, 3)`', sma.center(arr, 3));
