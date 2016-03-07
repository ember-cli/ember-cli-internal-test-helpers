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
});
