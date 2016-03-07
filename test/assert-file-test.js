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
    expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/missing.txt\' to exist');
    expect(err.actual).to.not.exist;
    expect(err.expected).to.not.exist;
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
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to be empty');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.equal('');
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
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to contain \'bar\'');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.equal('bar');
    });

    it('should pass if file contains multiple strings', function() {
      assertFile('test/fixtures/foo123.txt', { contains: ['foo', '123'] });
    });

    it('should throw if file does not contain one of multiple strings', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: ['foo', 'bar'] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to contain \'bar\'');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.equal('bar');
    });

    it('should pass if file matches regex', function() {
      assertFile('test/fixtures/foo123.txt', { contains: /fo+/ });
    });

    it('should throw if file does not match regex', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: /bar/ });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to match /bar/');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.eql(/bar/);
    });

    it('should pass if file matches multiple regexes', function() {
      assertFile('test/fixtures/foo123.txt', { contains: [/fo+/, /\d+/] });
    });

    it('should throw if file does not match one of multiple regexes', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { contains: [/fo+/, /bar/] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to match /bar/');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.eql(/bar/);
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
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to not contain \'foo\'');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.equal('foo');
    });

    it('should pass if file does not contains multiple strings', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: ['bar', 'baz'] });
    });

    it('should throw if file contains one of multiple strings', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: ['foo', 'bar'] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to not contain \'foo\'');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.equal('foo');
    });

    it('should pass if file does not match regex', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: /bar/ });
    });

    it('should throw if file matches regex', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: /fo+/ });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to not match /fo+/');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.eql(/fo+/);
    });

    it('should pass if file does not match multiple regexes', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: [/ba./, /\d{7}/] });
    });

    it('should throw if file matches one of multiple regexes', function() {
      var err = catchError(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: [/fo+/, /ba./] });
      });

      expect(err).to.exist;
      expect(err.toString()).to.equal('AssertionError: expected \'test/fixtures/foo123.txt\' to not match /fo+/');
      expect(err.actual).to.equal('foo\n123\nfoo123foo\nbla\n');
      expect(err.expected).to.eql(/fo+/);
    });
  });
});
