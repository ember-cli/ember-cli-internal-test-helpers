var assertFile = require('../lib/helpers/assert-file');
var expect = require('chai').expect;

describe('assert-file', function() {
  it('should pass if file exists', function() {
    assertFile('test/fixtures/empty.txt');
  });

  it('should throw if file does not exist', function() {
    expect(function() {
      assertFile('test/fixtures/missing.txt');
    }).to.throw('AssertionError: expected test/fixtures/missing.txt to exist: expected false to equal true')
  });

  describe('isEmpty', function() {
    it('should pass if file is empty', function() {
      assertFile('test/fixtures/empty.txt', { isEmpty: true });
    });

    it('should throw if file is not empty', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { isEmpty: true });
      }).to.throw('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nto be empty.\n: expected \'foo\\n123\\nfoo123foo\\nbla\\n\' to equal \'\'')
    });
  });
});
