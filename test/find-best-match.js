'use strict';

var findBestMatch = require('../lib/find-best-match');

describe('findBestMatch', function () {
  it('returns nothing if there are not enough results to try to match', function () {
    expect(findBestMatch([])).to.equal(undefined); // eslint-disable-line no-undefined
  });

  it('returns nothing if not every element has a matchStrength property', function () {
    expect(findBestMatch([{
      matchStrength: 4
    }, {
    }, {
      matchStrength: 5
    }])).to.equal(undefined); // eslint-disable-line no-undefined
  });

  it('returns the result with the greatest matchStrength value', function () {
    var a = {
      matchStrength: 4
    };
    var b = {
      matchStrength: 1
    };
    var c = {
      matchStrength: 40
    };
    var d = {
      matchStrength: 7
    };
    var results = [a, b, c, d];

    expect(findBestMatch(results)).to.equal(c);
  });
});

