'use strict';

var types = require('./card-types');

function findType(type, customCards) {
  return customCards[type] || types[type];
}

module.exports = findType;
