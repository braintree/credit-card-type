'use strict';

function clone(originalObject) {
  let dupe;

  if (!originalObject) {
    return null;
  }

  dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}

module.exports = clone;
