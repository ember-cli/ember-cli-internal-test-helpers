'use strict';

var expect     = require('chai').expect;
var flatten    = require('lodash/flatten');
var contains   = require('lodash/includes');
var fs         = require('fs-extra');
var path       = require('path');
var EOL        = require('os').EOL;
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
  expect(exists).to.equal(true, 'expected ' + file + ' to exist');
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
      var pass;

      if (expected.test) {
        pass = expected.test(actual);
      } else {
        pass = contains(actual, expected);
      }

      var message =  'expected: `' + file + '`';
      if (pass) {
        expect(true).to.equal(true, EOL + EOL + 'expected ' + file + ':' + EOL + EOL +
                                    actual +
                                    EOL + 'to contain:' + EOL + EOL +
                                    expected + EOL);
      } else {
        throw new EqualityError(message, actual, expected);
      }
    });
  }

  if (options.doesNotContain) {
    flatten([options.doesNotContain]).forEach(function(unexpected) {
      var pass;

      if (unexpected.test) {
        pass = !unexpected.test(actual);
      } else {
        pass = !contains(actual, unexpected);
      }
      expect(pass).to.equal(true, EOL + EOL + 'expected ' + file + ':' + EOL + EOL +
                                  actual + EOL +
                                  'not to contain:' + EOL + EOL +
                                  unexpected + EOL);
    });
  }
  
  if (options.isEmpty) {
    expect(actual).to.equal('', EOL + EOL + 'expected ' + file + ':' + EOL + EOL +
                                  actual + EOL +
                                  'to be empty.' + EOL);
  }
};

function EqualityError(message, actual, expected) {
  this.message = message;
  this.actual = actual;
  this.expected = expected;
  this.showDiff = true;
  Error.captureStackTrace(this, module.exports);
}

EqualityError.prototype = Object.create(Error.prototype);
EqualityError.prototype.name = 'EqualityError';
EqualityError.prototype.constructor = EqualityError;
