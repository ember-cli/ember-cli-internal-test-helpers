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
    expect(err.toString()).to.equal('AssertionError: expected \'foo\\n123\\nfoo123foo\\nbla\\n\' to not exist');
  });
});
