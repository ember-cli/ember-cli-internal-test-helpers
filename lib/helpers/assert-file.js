'use strict';

var AssertionError = require('chai').AssertionError;
var flatten    = require('lodash/flatten');
var contains   = require('lodash/includes');
var fs         = require('fs-extra');
var path       = require('path');
var walkSync   = require('walk-sync');
var existsSync = require('exists-sync');
var debug      = require('debug')('ember-cli-internal-test-helpers:assert-file');


/*
  Asserts that a given file exists.

  ```js
  assertFile('some/file.js');
  ```

  You can also make assertions about the file’s contents using
  `contains` and `doesNotContain`:

  ```js
  assertFile('some/file.js', {
    contains: [
      'foo',
      /[0-9]+/
    ],
    doesNotContain: 'bar'
  });
  ```

  @method assertFile
  @param {String} file
  @param {Object} options
         Optional extra assertions to perform on the file.
  @param {String, Array} options.contains
         Strings or regular expressions the file must contain.
  @param {String, Array} options.doesNotContain
         Strings or regular expressions the file must *not* contain.
*/
module.exports = function assertFile(file, options) {
  // console.log(process.cwd(), file)
  var filePath = path.join(process.cwd(), file);
  var exists = existsSync(filePath);
  // console.log(filePath + ' exists: ',exists)
if(!exists) {
  debug(filePath + ' contents:')
  debug(walkSync(process.cwd()))
}
  if (!exists) {
    throw new AssertionError('expected \'' + file + '\' to exist')
  }

  if (!options) {
    debug('no options, returning.');
    // console.log('no options')
    return;
  }
  try {
    // console.log('trying to read: ', filePath)
    var actual = fs.readFileSync(filePath, { encoding: 'utf-8' });
  } catch (err) {
    console.log('content assert read error')
    // console.error(err.message);
    // console.error(err.stack);
    throw err;
  }
  if (options.contains) {
    flatten([options.contains]).forEach(function(expected) {
      var pass, message;

      if (expected.test) {
        pass = expected.test(actual);
        message = 'expected \'' + file + '\' to match ' + expected;
      } else {
        pass = contains(actual, expected);
        message = 'expected \'' + file + '\' to contain \'' + expected + '\'';
      }

      if (!pass) {
        throw new AssertionError(message, {
          actual: actual,
          expected: expected,
          showDiff: true
        });
      }
    });
  }

  if (options.doesNotContain) {
    flatten([options.doesNotContain]).forEach(function(unexpected) {
      var pass, message;

      if (unexpected.test) {
        pass = !unexpected.test(actual);
        message = 'expected \'' + file + '\' to not match ' + unexpected;
      } else {
        pass = !contains(actual, unexpected);
        message = 'expected \'' + file + '\' to not contain \'' + unexpected + '\'';
      }

      if (!pass) {
        throw new AssertionError(message, {
          actual: actual,
          expected: unexpected,
          showDiff: true
        });
      }
    });
  }

  if (options.isEmpty && actual !== '') {
    throw new AssertionError('expected \'' + file + '\' to be empty', {
      actual: actual,
      expected: '',
      showDiff: true
    });
  }
};
