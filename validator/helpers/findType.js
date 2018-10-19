'use strict';

var types = require('../cardTypes');

function findType(type, customCards) {
  return customCards[type] || types[type];
}

module.exports = findType;
