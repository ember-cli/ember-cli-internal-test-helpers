var assertFileToNotExist = require('../lib/helpers/assert-file-to-not-exist');
var expect = require('chai').expect;

describe('assert-file-to-not-exist', function() {
  it('should pass if file does not exist', function() {
    assertFileToNotExist('test/fixtures/missing.txt');
  });

  it('should throw if file exists', function() {
    expect(function() {
      assertFileToNotExist('test/fixtures/foo123.txt');
    }).to.throw('AssertionError: expected \'foo\\n123\\nfoo123foo\\nbla\\n\' to not exist')
  });
});
