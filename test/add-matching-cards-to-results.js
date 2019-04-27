'use strict';

var addMatchingCardsToResults = require('../lib/add-matching-cards-to-results');

describe('addMatchingCardsToResults', function () {
  it('adds a clone of matching card configurations to results array', function () {
    var a = {};
    var b = {
      patterns: ['1', '2']
    };
    var results = [a];

    addMatchingCardsToResults('1', b, results);

    expect(results.length).to.equal(2);
    expect(results[0]).to.equal(a);
    expect(results[1].patterns).to.deep.equal(['1', '2']);
    expect(results[1]).to.not.equal(b);
  });

  it('does not add a configuration if it does not match', function () {
    var a = {};
    var b = {
      patterns: ['1', '2']
    };
    var results = [a];

    addMatchingCardsToResults('3', b, results);

    expect(results.length).to.equal(1);
    expect(results[0]).to.equal(a);
  });

  it('adds a matchStrength property to configuration if card number matches and the length equals or is greater than the pattern length', function () {
    var results = [];

    addMatchingCardsToResults('304', {
      patterns: ['304']
    }, results);

    addMatchingCardsToResults('304', {
      patterns: ['30']
    }, results);

    addMatchingCardsToResults('304', {
      patterns: ['3045']
    }, results);

    addMatchingCardsToResults('304', {
      patterns: ['3']
    }, results);

    expect(results.length).to.equal(4);
    expect(results[0].matchStrength).to.equal(3);
    expect(results[1].matchStrength).to.equal(2);
    expect(results[2].matchStrength).to.equal(undefined); // eslint-disable-line no-undefined
    expect(results[3].matchStrength).to.equal(1);
  });

  it('adds a matchStrength property to configuration if card number matcehs and the length equals or is greater than an entry of the pattern range', function () {
    var results = [];

    addMatchingCardsToResults('304', {
      patterns: [['304', '305']]
    }, results);

    addMatchingCardsToResults('304', {
      patterns: [['30', '99']]
    }, results);

    addMatchingCardsToResults('304', {
      patterns: [['3045', '4500']]
    }, results);

    addMatchingCardsToResults('304', {
      patterns: [['3', '5']]
    }, results);

    expect(results.length).to.equal(4);
    expect(results[0].matchStrength).to.equal(3);
    expect(results[1].matchStrength).to.equal(2);
    expect(results[2].matchStrength).to.equal(undefined); // eslint-disable-line no-undefined
    expect(results[3].matchStrength).to.equal(1);
  });
});
