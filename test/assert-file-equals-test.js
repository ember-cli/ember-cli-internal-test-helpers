var assertFileEquals = require('../lib/helpers/assert-file-equals');
var expect = require('chai').expect;
var catchError = require('./helpers/catch-error');

describe('assert-file-equals', function() {
  it('should pass if file contents are equal', function() {
    assertFileEquals('test/fixtures/foo123.txt', 'test/fixtures/foo123-copy.txt');
  });

  it('should throw if file contents are not equal', function() {
    var err = catchError(function() {
      assertFileEquals('test/fixtures/foo123.txt', 'test/fixtures/empty.txt');
    });

    expect(err).to.exist;
    expect(err.toString()).to.equal('AssertionError: expected \'foo\\n123\\nfoo123foo\\nbla\\n\' to equal \'\'');
  });
});
