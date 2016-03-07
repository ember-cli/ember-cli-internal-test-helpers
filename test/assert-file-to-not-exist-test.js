var assertFileToNotExist = require('../lib/helpers/assert-file-to-not-exist');
var expect = require('chai').expect;
var catchError = require('./helpers/catch-error');

describe('assert-file-to-not-exist', function() {
  it('should pass if file does not exist', function() {
    assertFileToNotExist('test/fixtures/missing.txt');
  });

  it('should throw if file exists', function() {
    var err = catchError(function() {
      assertFileToNotExist('test/fixtures/foo123.txt');
    });

    expect(err).to.exists;
    expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to not exist');
    expect(err.actual).to.not.exist;
    expect(err.expected).to.not.exist;
  });
});
