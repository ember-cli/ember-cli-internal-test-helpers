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

  describe('contains', function() {
    it('should pass if file contains string', function() {
      assertFile('test/fixtures/foo123.txt', { contains: 'foo' });
    });

    it('should throw if file does not contain string', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { contains: 'bar' });
      }).to.throw('EqualityError: expected: `test/fixtures/foo123.txt`')
    });

    it('should pass if file contains multiple strings', function() {
      assertFile('test/fixtures/foo123.txt', { contains: ['foo', '123'] });
    });

    it('should throw if file does not contain one of multiple strings', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { contains: ['foo', 'bar'] });
      }).to.throw('EqualityError: expected: `test/fixtures/foo123.txt`')
    });

    it('should pass if file matches regex', function() {
      assertFile('test/fixtures/foo123.txt', { contains: /fo+/ });
    });

    it('should throw if file does not match regex', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { contains: /bar/ });
      }).to.throw('EqualityError: expected: `test/fixtures/foo123.txt`')
    });

    it('should pass if file matches multiple regexes', function() {
      assertFile('test/fixtures/foo123.txt', { contains: [/fo+/, /\d+/] });
    });

    it('should throw if file does not match one of multiple regexes', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { contains: [/fo+/, /bar/] });
      }).to.throw('EqualityError: expected: `test/fixtures/foo123.txt`')
    });
  });

  describe('doesNotContain', function() {
    it('should pass if file does not contain string', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: 'bar' });
    });

    it('should throw if file contains string', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: 'foo' });
      }).to.throw('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\nfoo\n: expected false to equal true')
    });

    it('should pass if file does not contains multiple strings', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: ['bar', 'baz'] });
    });

    it('should throw if file contains one of multiple strings', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: ['foo', 'bar'] });
      }).to.throw('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\nfoo\n: expected false to equal true')
    });

    it('should pass if file does not match regex', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: /bar/ });
    });

    it('should throw if file matches regex', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: /fo+/ });
      }).to.throw('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\n/fo+/\n: expected false to equal true')
    });

    it('should pass if file does not match multiple regexes', function() {
      assertFile('test/fixtures/foo123.txt', { doesNotContain: [/ba./, /\d{7}/] });
    });

    it('should throw if file matches one of multiple regexes', function() {
      expect(function() {
        assertFile('test/fixtures/foo123.txt', { doesNotContain: [/fo+/, /ba./] });
      }).to.throw('AssertionError: \n\nexpected test/fixtures/foo123.txt:\n\nfoo\n123\nfoo123foo\nbla\n\nnot to contain:\n\n/fo+/\n: expected false to equal true')
    });
  });
});
