'use strict';

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
  delete dupe.prefixPattern;
  delete dupe.exactPattern;

  return dupe;
}

testOrder = clone(ORIGINAL_TEST_ORDER);

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4/,
  exactPattern: new RegExp('^' +
    '4' +
    '(?!' +
      '31274|51416|57393|0117[89]|38935|5763[12]' + // Elo cards
    ')\\d{5,}' +
  '$'),
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
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*$/,
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
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
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
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
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
  prefixPattern: /^(6|60|601|6011|65|65\d{1,4}|64|64[4-9])$/,
  exactPattern: new RegExp('^(' +
    '6011' +
    '|' +
    '65' +
      '(?!' + // Elo cards
        '003[1-3]' +
        '|' +
        '003[5-9]|004\\d|005[0-1]' +
        '|' +
        '040[5-9]|04[1-3]\\d' +
        '|' +
        '048[5-9]|049\\d|05[0-2]\\d|053[0-8]' +
        '|' +
        '054[1-9]|05[5-8]\\d|059[0-8]' +
        '|' +
        '070\\d|071[0-8]' +
        '|' +
        '072[0-7]' +
        '|' +
        '090[1-9]|09[1-6]\\d|097[0-8]' +
        '|' +
        '165[2-9]|16[6-7]\\d' +
        '|' +
        '50[0-1]\\d' +
        '|' +
        '502[1-9]|50[3-4]\\d|505[0-8]' +
      ')\\d{4}' +
    '|' +
    '64[4-9]' +
  ')\\d*$'),
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
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
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
  prefixPattern: /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[0267]\d?|628(?!0|1)|629[1,2])|622018)$/,
  exactPattern: new RegExp('^(' +
    '(' +
      '620' +
      '|' +
      '(621(?!83|88|98|99))' +
      '|' +
      '622(?!06|018)' +
      '|' +
      '62[3-6]' +
      '|' +
      '627[026]' +
      '|' +
      '6277(?!80)\\d{2}' + // Elo card
      '|' +
      '628(?!0|1)' +
      '|' +
      '629[12]' +
    ')\\d*' +

    '|' +

    '622018\\d{12}' +
  ')$'),
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
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: new RegExp('^(' +
    '5[6-9]' +
    '|' +
    '50' +
      '(?!' + // Elo card ranges
        '6699|067[0-6][0-9]' +
        '|' +
        '677[0-8]' +
        '|' +
        '9[0-9][0-9][0-9]' +
      ')\\d{4}' +
    '|' +
    '67' +
    '|' +
    '63' +
      '(?!' + // More Elo card ranges
        '6297|6368' +
      ')\d{4}' +
    ')\\d*$'
  ),
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
  prefixPattern: new RegExp('^(' +
    '[4-6]' +

    '|' +

    '4[035]|4[035]1' +
    '|' +
    '4011|40117|40117[89]' +
    '|' +
    '4312|43127|431274' +
    '|' +
    '438|4389|43893|438935' +
    '|' +
    '4514|45141|451416' +
    '|' +
    '457|457[36]|45739|45763|457393|45763[12]' +

    '|' +

    '50|50[69]' +
    '|' +
    '506[6-7]|50669|5067[0-7]|5067[0-6][0-9]|50677[0-8]' +
    '|' +
    '509[0-9]|509[0-9][0-9]|509[0-9][0-9][0-9]' +

    '|' +

    '6[235]|627|636|65[015]' +
    '|' +
    '6277|62778|627780' +
    '|' +
    '636[23]|63629|636297|63636|636368' +
    '|' +
    '650[0479]' +
    '|' +
    '6500[3-5]|65003[1-3]|65003[5-9]|65004[0-9]65005[01]' +
    '|' +
    '6504[0-3]|65040[5-9]|65041[0-9]' +
    '|' +
    '6505[4-9]|65054[1-9]|6505[5-8][0-9]|65059[0-8]' +
    '|' +
    '6507[0-2]|65070[0-9]|65071[0-8]|65072[0-7]' +
    '|' +
    '6509[0-7]|65090[1-9]|6509[1-6][0-9]|65097[0-8]' +
    '|' +
    '6516|6516[5-7]|65165[2-9]|6516[6-7][0-9]' +
    '|' +
    '6550|6550[0-5]|6550[01][0-9]|65502[1-9]|6550[3-4][0-9]|65505[0-8]' +
  ')$'),
  exactPattern: new RegExp('^(' +
    // Elo only ranges
    '4(31274|51416|57393)' +

    '|' +

    '50(' +
      '4175' +
      '|' +
      '6699|67[0-6][0-9]|677[0-8]' + // 506699-506778
      '|' +
      '9[0-9][0-9][0-9]' + // 509000-509999
    ')' +

    '|' +

    '627780' +

    '|' +

    '636(297|368)' +

    '|' +

    // Dual Branded with Visa
    '4(0117[89]|38935|5763[12])' +

    '|' +

    // Dual Branded with Discover
    '65(' +
      '003[1-3]' + // 650031-650033
      '|' +
      '003[5-9]|004\\d|005[0-1]' + // 650035-650051
      '|' +
      '040[5-9]|04[1-3]\\d' + // 650405-650439
      '|' +
      '048[5-9]|049\\d|05[0-2]\\d|053[0-8]' + // 650485-650538
      '|' +
      '054[1-9]|05[5-8]\\d|059[0-8]' + // 650541-650598
      '|' +
      '070[0-9]|071[0-8]' + // 650700-650718
      '|' +
      '072[0-7]' + // 650720-650727
      '|' +
      '090[1-9]|09[1-6][0-9]|097[0-8]' + // 650901-650978
      '|' +
      '165[2-9]|16[6-7][0-9]' + // 651652-651679
      '|' +
      '50[0-1][0-9]' + // 655000-655019
      '|' +
      '502[1-9]|50[3-4][0-9]|505[0-8]' + // 655021-655058
    ')' +
  ')\\d*$'),
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
  prefixPattern: /^(2|22|220|220[0-4])$/,
  exactPattern: /^(220[0-4])\d*$/,
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
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = findType(type);

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
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
