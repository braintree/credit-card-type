// 'use strict';

// var types = require('./validator/cardTypes.json');

// var testOrder;
// var customCards = {};
// var VISA = 'visa';
// var MASTERCARD = 'mastercard';
// var AMERICAN_EXPRESS = 'american-express';
// var DINERS_CLUB = 'diners-club';
// var DISCOVER = 'discover';
// var ELO = 'elo';
// var JCB = 'jcb';
// var UNIONPAY = 'unionpay';
// var MAESTRO = 'maestro';
// var MIR = 'mir';

// var ORIGINAL_TEST_ORDER = [
//   VISA,
//   MASTERCARD,
//   AMERICAN_EXPRESS,
//   DINERS_CLUB,
//   DISCOVER,
//   JCB,
//   UNIONPAY,
//   MAESTRO,
//   ELO,
//   MIR
// ];

// creditCardType.types = {
//   VISA: VISA,
//   MASTERCARD: MASTERCARD,
//   AMERICAN_EXPRESS: AMERICAN_EXPRESS,
//   DINERS_CLUB: DINERS_CLUB,
//   DISCOVER: DISCOVER,
//   JCB: JCB,
//   UNIONPAY: UNIONPAY,
//   MAESTRO: MAESTRO,
//   ELO: ELO,
//   MIR: MIR
// };

// // function clone(originalObject) {
// //   var dupe;

// //   if (!originalObject) { return null; }

// //   dupe = JSON.parse(JSON.stringify(originalObject));

// //   return dupe;
// // }

// testOrder = clone(ORIGINAL_TEST_ORDER);

// // function findType(type) {
// //   return customCards[type] || types[type];
// // }

// // function isValidInputType(cardNumber) {
// //   return typeof cardNumber === 'string' || cardNumber instanceof String;
// // }

// // function hasEnoughResultsToDetermineBestMatch(results) {
// //   var numberOfResultsWithMaxStrengthProperty = results.filter(function (result) {
// //     return result.matchStrength;
// //   }).length;

// //   // if all possible results have a maxStrength property
// //   // that means the card number is sufficiently long
// //   // enough to determine conclusively what the type is
// //   return numberOfResultsWithMaxStrengthProperty > 0 &&
// //     numberOfResultsWithMaxStrengthProperty === results.length;
// // }

// // function findBestMatch(results) {
// //   if (!hasEnoughResultsToDetermineBestMatch(results)) {
// //     return;
// //   }

// //   return results.reduce(function (bestMatch, result) { // eslint-disable-line consistent-return
// //     if (!bestMatch) {
// //       return result;
// //     }

// //     // if the current best match pattern is less specific
// //     // than this result, set the result as the new best match
// //     if (bestMatch.matchStrength < result.matchStrength) {
// //       return result;
// //     }

// //     return bestMatch;
// //   });
// // }

// // function getAllCardTypes() {
// //   return testOrder.map(function (type) {
// //     return clone(findType(type));
// //   });
// // }

// // function creditCardType(cardNumber) {
// //   var bestMatch;
// //   var results = [];

// //   if (!isValidInputType(cardNumber)) {
// //     return [];
// //   }

// //   if (cardNumber.length === 0) {
// //     return getAllCardTypes();
// //   }

// //   testOrder.forEach(function (type) {
// //     var cardConfiguration = findType(type);

// //     loopOverCardPatterns(cardNumber, cardConfiguration, results);
// //   });

// //   bestMatch = findBestMatch(results);

// //   if (bestMatch) {
// //     return [bestMatch];
// //   }

// //   return results;
// // }

// // function loopOverCardPatterns(cardNumber, cardConfiguration, results) {
// //   var i, pattern, patternLength, clonedCardConfiguration;

// //   for (i = 0; i < cardConfiguration.patterns.length; i++) {
// //     pattern = cardConfiguration.patterns[i];

// //     if (!matches(cardNumber, pattern)) {
// //       continue;
// //     }

// //     clonedCardConfiguration = clone(cardConfiguration);

// //     if (Array.isArray(pattern)) {
// //       patternLength = String(pattern[0]).length;
// //     } else {
// //       patternLength = String(pattern).length;
// //     }

// //     if (cardNumber.length >= patternLength) {
// //       clonedCardConfiguration.matchStrength = patternLength;
// //     }

// //     results.push(clonedCardConfiguration);
// //     break;
// //   }
// // }

// // function matches(cardNumber, pattern) {
// //   if (Array.isArray(pattern)) {
// //     return matchesRange(cardNumber, pattern[0], pattern[1]);
// //   }

// //   return matchesPattern(cardNumber, pattern);
// // }

// // function matchesPattern(cardNumber, pattern) {
// //   pattern = String(pattern);

// //   return pattern.substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length);
// // }

// // // Adapted from https://github.com/polvo-labs/card-type/blob/aaab11f80fa1939bccc8f24905a06ae3cd864356/src/cardType.js#L37-L42
// // function matchesRange(cardNumber, min, max) {
// //   var maxLengthToCheck = String(min).length;
// //   var substr = cardNumber.substr(0, maxLengthToCheck);
// //   var integerRepresentationOfCardNumber = parseInt(substr, 10);

// //   min = parseInt(String(min).substr(0, substr.length), 10);
// //   max = parseInt(String(max).substr(0, substr.length), 10);

// //   return integerRepresentationOfCardNumber >= min && integerRepresentationOfCardNumber <= max;
// // }

// creditCardType.getTypeInfo = function (type) {
//   return clone(findType(type));
// };

// // function getCardPosition(name, ignoreErrorForNotExisting) {
// //   var position = testOrder.indexOf(name);

// //   if (!ignoreErrorForNotExisting && position === -1) {
// //     throw new Error('"' + name + '" is not a supported card type.');
// //   }

// //   return position;
// // }

// creditCardType.removeCard = function (name) {
//   var position = getCardPosition(name);

//   testOrder.splice(position, 1);
// };

// creditCardType.addCard = function (config) {
//   var existingCardPosition = getCardPosition(config.type, true);

//   customCards[config.type] = config;

//   if (existingCardPosition === -1) {
//     testOrder.push(config.type);
//   }
// };

// creditCardType.updateCard = function (cardType, updates) {
//   var clonedCard;
//   var originalObject = customCards[cardType] || types[cardType];

//   if (!originalObject) {
//     throw new Error('"' + cardType + '" is not a recognized type. Use `addCard` instead.');
//   }

//   if (updates.type && originalObject.type !== updates.type) {
//     throw new Error('Cannot overwrite type parameter.');
//   }

//   clonedCard = clone(originalObject, true);

//   Object.keys(clonedCard).forEach(function (key) {
//     if (updates[key]) {
//       clonedCard[key] = updates[key];
//     }
//   });

//   customCards[clonedCard.type] = clonedCard;
// };

// creditCardType.changeOrder = function (name, position) {
//   var currentPosition = getCardPosition(name);

//   testOrder.splice(currentPosition, 1);
//   testOrder.splice(position, 0, name);
// };

// creditCardType.resetModifications = function () {
//   testOrder = clone(ORIGINAL_TEST_ORDER);
//   customCards = {};
// };

// creditCardType.types = {
//   VISA: VISA,
//   MASTERCARD: MASTERCARD,
//   AMERICAN_EXPRESS: AMERICAN_EXPRESS,
//   DINERS_CLUB: DINERS_CLUB,
//   DISCOVER: DISCOVER,
//   JCB: JCB,
//   UNIONPAY: UNIONPAY,
//   MAESTRO: MAESTRO,
//   ELO: ELO,
//   MIR: MIR
// };

// module.exports = creditCardType;
