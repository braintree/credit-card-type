'use strict';

var isValidInputType = require('../lib/is-valid-input-type');

describe('isValidInputType', function () {
  it('returns true if value is a string', function () {
    expect(isValidInputType('string')).to.equal(true);
  });

  it('returns true if value is a string object', function () {
    expect(isValidInputType(new String('string'))).to.equal(true); // eslint-disable-line no-new-wrappers
  });

  it('returns false for non-string values', function () {
    expect(isValidInputType(12)).to.equal(false);
    expect(isValidInputType({foo: 'bar'})).to.equal(false);
    expect(isValidInputType([])).to.equal(false);
    expect(isValidInputType(false)).to.equal(false);
    expect(isValidInputType(true)).to.equal(false);
  });
});

