'use strict';

var cardTypes = {};
var cards = {};

cardTypes.VISA = 'visa';
cards[cardTypes.VISA] = {
  niceType: 'Visa',
  type: cardTypes.VISA,
  pattern: '^4\\d*$',
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
};

cardTypes.MASTERCARD = 'master-card';
cards[cardTypes.MASTERCARD] = {
  niceType: 'MasterCard',
  type: cardTypes.MASTERCARD,
  pattern: '^(5|5[1-5]\\d*|2|22|222|222[1-9]\\d*|2[3-6]\\d*|27[0-1]\\d*|2720\\d*)$',
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVC',
    size: 3
  }
};

cardTypes.AMERICAN_EXPRESS = 'american-express';
cards[cardTypes.AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: cardTypes.AMERICAN_EXPRESS,
  pattern: '^3([47]\\d*)?$',
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: 'CID',
    size: 4
  }
};

cardTypes.DINERS_CLUB = 'diners-club';
cards[cardTypes.DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: cardTypes.DINERS_CLUB,
  pattern: '^3((0([0-5]\\d*)?)|[689]\\d*)?$',
  gaps: [4, 10],
  lengths: [14],
  code: {
    name: 'CVV',
    size: 3
  }
};

cardTypes.DISCOVER = 'discover';
cards[cardTypes.DISCOVER] = {
  niceType: 'Discover',
  type: cardTypes.DISCOVER,
  pattern: '^6(0|01|011\\d*|5\\d*|4|4[4-9]\\d*)?$',
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: 'CID',
    size: 3
  }
};

cardTypes.JCB = 'jcb';
cards[cardTypes.JCB] = {
  niceType: 'JCB',
  type: cardTypes.JCB,
  pattern: '^((2|21|213|2131\\d*)|(1|18|180|1800\\d*)|(3|35\\d*))$',
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
};

cardTypes.UNIONPAY = 'unionpay';
cards[cardTypes.UNIONPAY] = {
  niceType: 'UnionPay',
  type: cardTypes.UNIONPAY,
  pattern: '^6(2\\d*)?$',
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: 'CVN',
    size: 3
  }
};

cardTypes.MAESTRO = 'maestro';
cards[cardTypes.MAESTRO] = {
  niceType: 'Maestro',
  type: cardTypes.MAESTRO,
  pattern: '^((5((0|[6-9])\\d*)?)|(6|6[37]\\d*))$',
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: 'CVC',
    size: 3
  }
};

function forCards(callback) {
  var key;

  for (key in cards) {
    if (cards.hasOwnProperty(key)) {
      callback(cards[key]);
    }
  }
}

function clone(x) {
  return x ? JSON.parse(JSON.stringify(x)) : x;
}

module.exports = function matchCards(cardNumber) {
  var result = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return result;
  }

  if (cardNumber === '') {
    forCards(function (value) {
      result.push(clone(value));
    });
  } else {
    forCards(function (value) {
      if (RegExp(value.pattern).test(cardNumber)) {
        result.push(clone(value));
      }
    });
  }

  return result;
};

module.exports.getCard = function (cardType) {
  return clone(cards[cardType]);
};

module.exports.types = clone(cardTypes);
