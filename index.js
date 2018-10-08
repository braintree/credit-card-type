'use strict';

/*******************************************************************************
 How card pattern detection works
********************************************************************************
 Each card type has a patterns attribute that is an array of numbers or arrays
 representing a range of numbers.

 If the pattern is a number, we compare it against the card number. Partial
 matches for card numbers that are shorter than the pattern also match. Given
 the pattern `123`, then the card numbers `1`, `12`, `123`, `1234` will all
 match, but `2`, `13`, and `124` will not.

 If the pattern is an array of numbers, then the card number is checked to be
 within the range of those numbers. Again, partial matches are accepted. Given
 the range `[100, 123]`, then the card numbers `1`, `10`, `100`, `12`, `120`,
 `123` will all match, but `2`, `13`, and `124` will not.

 For detection, we loop over each card types patterns array, and if a match
 occurs, that card type is added to the results. This should give a few
 results when only a few numbers from the credit card are entered, but should
 narrow down to a single result once 6 or more digits have been entered.
*/

var testOrder;
var types = {};
var customCards = {};
var VISA = 'visa';
var MASTERCARD = 'mastercard';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var ELO = 'elo';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var MIR = 'mir';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var CVP2 = 'CVP2';
var CVE = 'CVE';
var ORIGINAL_TEST_ORDER = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO,
  ELO,
  MIR
];

function clone(originalObject) {
  var dupe;

  if (!originalObject) { return null; }

  dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}

testOrder = clone(ORIGINAL_TEST_ORDER);

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  patterns: [
    // Visas start with 4, except for a few bins
    // which are ELO cards
    [400000, 401177],
    [401180, 431273],
    [431275, 438934],
    [438936, 451415],
    [451417, 457392],
    [457394, 457630],
    [457633, 493697],
    // and one more bin, which is a UK Maestro card
    [493699, 499999]
  ],
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'Mastercard',
  type: MASTERCARD,
  patterns: [
    [51, 55],
    [2221, 2229],
    [223, 229],
    [23, 26],
    [270, 271],
    2720
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  patterns: [
    34,
    37
  ],
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  patterns: [
    [300, 305],
    36,
    38,
    39
  ],
  gaps: [4, 10],
  lengths: [14, 16, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  patterns: [
    6011,
    [644, 649],
    65
  ],
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  patterns: [
    2131,
    1800,
    35
  ],
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  patterns: [
    620,
    [62100, 62182],
    [62184, 62187],
    [62185, 62197],
    [62200, 62205],
    [62207, 62209],
    [622010, 622017],
    [622019, 622999],
    [623, 626],
    6270,
    6272,
    6276,
    [627700, 627779],
    [627781, 627799],
    [6282, 6289],
    6291,
    6292,
    622018
  ],
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  patterns: [
    493698,
    [500000, 506698],
    [506779, 508999],

    [56, 59],
    63,
    67,
    6
  ],
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

types[ELO] = {
  niceType: 'Elo',
  type: ELO,
  patterns: [
    401178,
    401179,
    431274,
    438935,
    451416,
    457393,
    457631,
    457632,
    504175,
    [506699, 506778],
    [509000, 509999],
    627780,
    636297,
    636368,
    [650031, 650033],
    [650035, 650051],
    [650405, 650439],
    [650485, 650538],
    [650541, 650598],
    [650700, 650718],
    [650720, 650727],
    [650901, 650978],
    [651652, 651679],
    [655000, 655019],
    [655021, 655058]
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVE,
    size: 3
  }
};

types[MIR] = {
  niceType: 'Mir',
  type: MIR,
  patterns: [
    [2200, 2204]
  ],
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVP2,
    size: 3
  }
};

function findType(type) {
  return customCards[type] || types[type];
}

function creditCardType(cardNumber) {
  var type, value, i;
  var results = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = findType(type);

    if (cardNumber.length === 0) {
      results.push(clone(value));
      continue;
    }

    loopOverPatterns(cardNumber, value, results);
  }

  var resultsWithExactMatches = results.filter(function (result) {
    return result.exactMatchPattern;
  });

  if (resultsWithExactMatches.length > 0 && resultsWithExactMatches.length === results.length) {
    var bestMatch;

    results.forEach(function (res) {
      if (!bestMatch) {
        bestMatch = res;
        return;
      }

      if (bestMatch.exactMatchPattern.length < res.exactMatchPattern.length) {
        bestMatch = res;
      }
    });

    return [bestMatch];
  }

  return results;
}

function loopOverPatterns(cardNumber, value, results) {
  var i, pattern, clonedValue;

  for (i = 0; i < value.patterns.length; i++) {
    pattern = value.patterns[i];

    if (Array.isArray(pattern)) {
      if (checkRange(cardNumber, pattern[0], pattern[1])) {
        clonedValue = clone(value);

        if (cardNumber.length >= String(pattern[0]).length) {
          clonedValue.exactMatchPattern = String(pattern[0]);
        }

        results.push(clonedValue);
        break;
      }
    } else {
      pattern = String(pattern);

      if (pattern.substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length)) {
        clonedValue = clone(value);

        if (cardNumber.length >= pattern.length) {
          clonedValue.exactMatchPattern = pattern;
        }

        results.push(clonedValue);
        break;
      }
    }
  }
}

function checkRange (cardNumber, min, max) {
  var length = min.toString().length
  var substr = cardNumber.substr(0, length)

  min = parseInt(String(min).substr(0, substr.length));
  max = parseInt(String(max).substr(0, substr.length));
  var value = parseInt(substr);

  return value >= min && value <= max
}

creditCardType.getTypeInfo = function (type) {
  return clone(findType(type));
};

function getCardPosition(name, ignoreErrorForNotExisting) {
  var position = testOrder.indexOf(name);

  if (!ignoreErrorForNotExisting && position === -1) {
    throw new Error('"' + name + '" is not a supported card type.');
  }

  return position;
}

creditCardType.removeCard = function (name) {
  var position = getCardPosition(name);

  testOrder.splice(position, 1);
};

creditCardType.addCard = function (config) {
  var existingCardPosition = getCardPosition(config.type, true);

  customCards[config.type] = config;

  if (existingCardPosition === -1) {
    testOrder.push(config.type);
  }
};

creditCardType.updateCard = function (cardType, updates) {
  var clonedCard;
  var originalObject = customCards[cardType] || types[cardType];

  if (!originalObject) {
    throw new Error('"' + cardType + '" is not a recognized type. Use `addCard` instead.');
  }

  if (updates.type && originalObject.type !== updates.type) {
    throw new Error('Cannot overwrite type parameter.');
  }

  clonedCard = clone(originalObject, true);

  Object.keys(clonedCard).forEach(function (key) {
    if (updates[key]) {
      clonedCard[key] = updates[key];
    }
  });

  customCards[clonedCard.type] = clonedCard;
};

creditCardType.changeOrder = function (name, position) {
  var currentPosition = getCardPosition(name);

  testOrder.splice(currentPosition, 1);
  testOrder.splice(position, 0, name);
};

creditCardType.resetModifications = function () {
  testOrder = clone(ORIGINAL_TEST_ORDER);
  customCards = {};
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO,
  ELO: ELO,
  MIR: MIR
};

module.exports = creditCardType;
