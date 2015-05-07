var isString = require('lodash.isstring');
var clone = require('lodash.clonedeep');

var types = [
  {
    niceType: 'Visa',
    type: 'visa',
    pattern: '^4\\d*$',
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVV',
      size: 3
    }
  },
  {
    niceType: 'MasterCard',
    type: 'master-card',
    pattern: '^5[1-5]\\d*$',
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVC',
      size: 3
    }
  },
  {
    niceType: 'American Express',
    type: 'american-express',
    pattern: '^3[47]\\d*$',
    isAmex: true,
    gaps: [4, 10],
    lengths: [15],
    code: {
      name: 'CID',
      size: 4
    }
  },
  {
    niceType: 'DinersClub',
    type: 'diners-club',
    pattern: '^3(0[0-5]|[689])\\d*$',
    gaps: [4, 10],
    lengths: [14],
    code: {
      name: 'CVV',
      size: 3
    }
  },
  {
    niceType: 'Discover',
    type: 'discover',
    pattern: '^6(011|5|4[4-9])\\d*$',
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CID',
      size: 3
    }
  },
  {
    niceType: 'JCB',
    type: 'jcb',
    pattern: '^(2131|1800|35)\\d*$',
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: 'CVV',
      size: 3
    }
  },
  {
    niceType: 'UnionPay',
    type: 'unionpay',
    pattern: '^62\\d*$',
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {
      name: 'CVN',
      size: 3
    }
  },
  {
    niceType: 'Maestro',
    type: 'maestro',
    pattern: '^(50|5[6-9]|6)\\d*$',
    gaps: [4, 8, 12],
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    code: {
      name: 'CVC',
      size: 3
    }
  }
];

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
