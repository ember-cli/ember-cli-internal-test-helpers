'use strict';

var assert = require('assert');
var fs     = require('fs');

/*
  Assert that a given file matches another.

  @method assertFileEqual
  @param {String} pathToActual
  @param {String} pathToExpected
*/
module.exports = function assertFileEquals(pathToActual, pathToExpected) {
  var actual = fs.readFileSync(pathToActual, { encoding: 'utf-8' });
  var expected = fs.readFileSync(pathToExpected, { encoding: 'utf-8' });

  assert.equal(actual, expected, 'expected \'' + pathToActual + '\' to match \'' + pathToExpected + '\' contents');
};
