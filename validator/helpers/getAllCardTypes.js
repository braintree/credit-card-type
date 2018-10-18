'use strict';

var findType = require('./findType');
var clone = require('./clone');

function getAllCardTypes(testOrder, customCards) {
  return testOrder.map(function (type) {
    return clone(findType(type, customCards));
  });
}

module.exports = getAllCardTypes;
