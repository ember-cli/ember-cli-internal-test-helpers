'use strict';

var AssertionError = require('chai').AssertionError;
var fs     = require('fs');

/*
  Assert that a file does not exist, for ensuring certain files aren't generated

  @method assertFileToNotExist
  @param {String} pathToCheck
*/
module.exports = function assertFileToNotExist(pathToCheck) {
  var exists;
  try {
    exists = fs.readFileSync(pathToCheck, { encoding: 'utf-8' });
  } catch (e) {
    if (e.code === 'ENOENT') {
        exists = null;
    } else {
        throw e;
    }
  }

  if (exists) {
    throw new AssertionError('expected \'' + pathToCheck + '\' to not exist')
  }
};
