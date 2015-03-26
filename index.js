var isString = require('lodash.isstring');
var clone = require('lodash.clonedeep');

var types = [
  {
    niceType: 'Visa',
    type: 'visa',
    pattern: '^4[0-9][\\s\\d]*$',
    gaps: [4, 8, 12],
    length: 16,
    code: {
      name: 'CVV',
      size: 3
    }
  },
  {
    niceType: 'MasterCard',
    type: 'master-card',
    pattern: '^5[1-5][\\s\\d]*$',
    gaps: [4, 8, 12],
    length: 16,
    code: {
      name: 'CVC',
      size: 3
    }
  },
  {
    niceType: 'American Express',
    type: 'american-express',
    pattern: '^3[47][\\s\\d]*$',
    isAmex: true,
    gaps: [4, 10],
    length: 15,
    code: {
      name: 'CID',
      size: 4
    }
  },
  {
    niceType: 'DinersClub',
    type: 'diners-club',
    pattern: '^3(?:0[0-5]|[68][0-9])[\\s\\d]*$',
    gaps: [4, 10],
    length: 14,
    code: {
      name: 'CVV',
      size: 3
    }
  },
  {
    niceType: 'Discover',
    type: 'discover',
    pattern: '^6(?:011|5[0-9]{2})[\\s\\d]*$',
    gaps: [4, 8, 12],
    length: 16,
    code: {
      name: 'CID',
      size: 3
    }
  },
  {
    niceType: 'JCB',
    type: 'jcb',
    pattern: '^(?:2131|1800|35)[\\s\\d]*$',
    gaps: [4, 8, 12],
    length: 16,
    code: {
      name: 'CVV',
      size: 3
    }
  }];

module.exports = function getCardType(cardNumber) {
  var key, value;
  var noMatch = {};

  if (!isString(cardNumber)) { return noMatch; }

  for (key in types) {
    if (!types.hasOwnProperty(key)) { continue; }

    value = types[key];

    if (RegExp(value.pattern).test(cardNumber)) { return clone(value); }
  }

  return noMatch;
};
