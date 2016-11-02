'use strict';

var avg = require('array-avg');

/**
 * Calculate the simple moving average of a given array and using a subset of `n` elements.
 * Note that elements that cannot be calculated because of not enough items in the subset will be set to 0
 *
 * ```js
 * var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * console.log(sma(arr, 3));
 * //=> [ 0, 0, 2, 3, 4, 5, 6, 7, 8, 9 ]
 *
 * // center the mean by passing `true` as the third argument
 * console.log(sma(arr, 3, true));
 * //=> [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * ```
 * @param  {Array} `arr` Array containing full set of items to calcualte
 * @param  {Number} `n` Number of items in each subset to use
 * @param  {Boolean} `center` Center around the item in the array. Defaults to `false`. See [center](#center) for more details.
 * @return {Array} Array containing averaged values
 * @api public
 */

function sma(arr, n, center) {
  if (center === true) {
    return sma.center(arr, n);
  }

  if (!Array.isArray(arr)) {
    throw new Error('expected first argument to be an array');
  }

  var calc = sma.calc(n);
  var res = [];
  var len = arr.length;
  var i = -1;
  var prev;
  while (++i < len) {
    res.push(0);
    if (i < (n - 1)) continue;
    if (prev) {
      res[i] = prev = calc(prev, arr[i], arr[i - n]);
    } else {
      res[i] = prev = avg(arr.slice(i - (n - 1), i + 1));
    }
  }
  return res;
};

/**
 * Calculate the simple moving average of a given array and using a subset of `n` elements.
 * The subset is calculated around the current index using `{i - ceil(n/2) .. i + ceil(n/2)}`. This requires that `n` is odd to have a balanced number of items on either side of `i`.
 * Note that elements that cannot be calculated because of not enough items in the subset will be set to 0
 *
 * ```js
 * console.log(sma.center(arr, 3));
 * //=> [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * ```
 * @param  {Array} `arr` Array containing full set of items to calcualte
 * @param  {Number} `n` Number of items in each subset to use
 * @return {Array} Array containing averaged values
 * @api public
 */

function center(arr, n) {
  if (!Array.isArray(arr)) {
    throw new Error('expected first argument to be an array');
  }

  var calc = sma.calc(n);
  var center = Math.ceil(n / 2);
  var res = [];
  var len = arr.length;
  var i = -1;
  var prev;
  while (++i < len) {
    res.push(0);
    if (i < (center - 1)) continue;
    if (i > (len - center)) continue;
    if (prev) {
      res[i] = prev = calc(prev, arr[i], arr[i - center]);
    } else {
      res[i] = prev = avg(arr.slice(i - (center - 1), i + center));
    }
  }
  return res;
}

/**
 * The calculation function used for calculating the next simple moving average in a series
 * of simple moving averages. This is used in the [sma](#sma) and [center](#center) functions after calculating
 * the average of the first subset. This reduces the amount of times that the total array needs to be sliced and
 * also allows for using the calculation function outside of this library when streaming an array of values.
 *
 * ```js
 * var prevAvg = avg([1, 2, 3]); // fake subset array with 3 values
 * var currentVal = 4; // current value (the value that would be next in the main array)
 * var firstVal = 1; // first value from the subset used to calculate the previous avg;
 *
 * // create a calc function that will calculate the next average using a subset size of 3
 * var calcFn = sma.calc(3);
 * var currentAvg = calcFn(prevAvg, currentVal, firstVal);
 * console.log(currentAvg);
 * //=> 3
 * ```
 * @param  {Number} `n` Size of the subsets
 * @param  {Number} `precision` Number of decimal places to use. Defaults to 0
 * @return {Number} Average from the calculation.
 * @api public
 */

function calc(n, precision) {
  n = +n;
  precision = precision || 0;
  return function(prevAvg, current, first) {
    return +(prevAvg + (current / n) - (first / n)).toFixed(precision);
  };
}

module.exports = sma;
module.exports.center = center;
module.exports.calc = calc;
