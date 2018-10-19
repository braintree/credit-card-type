'use strict';

var matchesRange = require('./matches-range');
var matchesPattern = require('./matches-pattern');

function matches(cardNumber, pattern) {
  if (Array.isArray(pattern)) {
    return matchesRange(cardNumber, pattern[0], pattern[1]);
  }

  return matchesPattern(cardNumber, pattern);
}

module.exports = matches;
