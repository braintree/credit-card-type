'use strict';

function getCardPosition(name, ignoreErrorForNotExisting, testOrder) {
  var position = testOrder.indexOf(name);

  if (!ignoreErrorForNotExisting && position === -1) {
    throw new Error('"' + name + '" is not a supported card type.');
  }

  return position;
}

module.exports = getCardPosition;
