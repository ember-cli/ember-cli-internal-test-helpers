var assertFile = require('../lib/helpers/assert-file');
var expect = require('chai').expect;
var catchError = require('./helpers/catch-error');

describe('assert-file', function() {
  it('should pass if file exists', function() {
    assertFile('test/fixtures/empty.txt');
  });

  it('should throw if file does not exist', function() {
    var err = catchError(function() {
      assertFile('test/fixtures/missing.txt');
    });

    expect(err).to.exist;
    expect(err.toString()).to.equal('AssertionError: expected test/fixtures/missing.txt to exist: expected false to equal true');
  });

  describe('isEmpty', function() {
    it('should pass if file is empty', function() {
      assertFile('test/fixtures/empty.txt', { isEmpty: true });
    });

    it('should throw if file is not empty', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { isEmpty: true });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nto be empty.\n: expected \'foo\\n123\\nfoo123foo\\nbla\\n\' to equal \'\'');
    });
  });

  describe('contains', function() {
    it('should pass if file contains string', function() {
      assertFile('test/fixtures/foo123.txt', { contains: 'foo' });
    });

    it('should throw if file does not contain string', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: 'bar' });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('EqualityError: expected: `test/fixtures/foo123.txt`');
    });

    it('should pass if file contains multiple strings', function() {
      assertFile('test/fixtures/foo123.txt', { contains: ['foo', '123'] });
    });

    it('should throw if file does not contain one of multiple strings', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: ['foo', 'bar'] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('EqualityError: expected: `test/fixtures/foo123.txt`');
    });

    it('should pass if file matches regex', function() {
      assertFile('test/fixtures/foo123.txt', { contains: /fo+/ });
    });

    it('should throw if file does not match regex', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: /bar/ });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('EqualityError: expected: `test/fixtures/foo123.txt`');
    });

    it('should pass if file matches multiple regexes', function() {
      assertFile('test/fixtures/foo123.txt', { contains: [/fo+/, /\d+/] });
    });

    it('should throw if file does not match one of multiple regexes', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: [/fo+/, /bar/] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('EqualityError: expected: `test/fixtures/foo123.txt`');
    });
  });

  describe('doesNotContain', function() {
    it('should pass if file does not contain string', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: 'bar' });
    });

    it('should throw if file contains string', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: 'foo' });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\nfoo\n: expected false to equal true');
    });

    it('should pass if file does not contains multiple strings', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: ['bar', 'baz'] });
    });

    it('should throw if file contains one of multiple strings', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: ['foo', 'bar'] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\nfoo\n: expected false to equal true');
    });

    it('should pass if file does not match regex', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: /bar/ });
    });

    it('should throw if file matches regex', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: /fo+/ });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\n/fo+/\n: expected false to equal true');
    });

    it('should pass if file does not match multiple regexes', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: [/ba./, /\d{7}/] });
    });

    it('should throw if file matches one of multiple regexes', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: [/fo+/, /ba./] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\n/fo+/\n: expected false to equal true');
    });
  });
});
