'use strict';

var avg = require('array-avg');
var sma = require('../');

var arr = [1, 2, 3];
console.log('start array', arr);

var prevAvg = avg(arr); // fake subset array with 3 values
console.log('average from start array', prevAvg);

var currentVal = 4; // current value (the value that would be next in the main array)
console.log('new value introduced', currentVal);

var firstVal = arr[0]; // first value from the subset used to calculate the previous avg;
console.log('first value from the start array', firstVal);

// create a calc function that will calculate the next average using a subset size of 3
var calcFn = sma.calc(3);
var currentAvg = calcFn(prevAvg, currentVal, firstVal);
console.log('average after introducing the new value', currentAvg);
