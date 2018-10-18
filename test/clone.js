'use strict';

var clone = require('../lib/clone');

describe('clone', function () {
  it('makes a deep copy of an object', function () {
    var obj = {foo: 'bar'};
    var clonedObj = clone(obj);

    expect(obj).to.not.equal(clonedObj);
    expect(obj).to.deep.equal(clonedObj);
  });
});
