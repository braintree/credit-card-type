Credit Card Type [![Build Status](https://travis-ci.org/braintree/credit-card-type.svg)](https://travis-ci.org/braintree/credit-card-type) [![npm version](https://badge.fury.io/js/credit-card-type.svg)](http://badge.fury.io/js/credit-card-type) [![Bower](https://badge.fury.io/bo/credit-card-type.svg)](http://badge.fury.io/bo/credit-card-type)
================

Credit Card Type provides a useful utility method for determining a credit card type from both fully qualified and partial numbers. This is not a validation library but rather a smaller component to help you build your own validation or UI library.

This library is designed for type-as-you-go detection (supports partial numbers) and is written in CommonJS so you can use it in Node, io.js, and the [browser](http://browserify.org).

## Download
To install via npm:

```bash
npm install credit-card-type
```

To install via Bower:

```bash
bower install credit-card-type
```

## Example

```javascript
var creditCardType = require('credit-card-type');

var visaCards = creditCardType('4111');
console.log(visaCards[0].type);  // 'visa'

var ambiguousCards = creditCardType('6');
console.log(ambiguousCards.length);       // 3
console.log(ambiguousCards[0].niceType);  // 'Discover'
console.log(ambiguousCards[1].niceType);  // 'UnionPay'
console.log(ambiguousCards[2].niceType);  // 'Maestro'
```

## API

### `creditCardType(number: String)`

`creditCardType` will return an array of objects, each with the following data:

| Key        | Type     | Description                                                                                                                                                                                                                                                                                                    |
|------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `niceType` | `String` | A pretty printed representation of the card brand.<br/>- `Visa`<br />- `MasterCard`<br />- `American Express`<br />- `Diners Club`<br />- `Discover`<br />- `JCB`<br />- `UnionPay`<br />- `Maestro`                                                                                                           |
| `type`     | `String` | A code-friendly presentation of the card brand (useful to class names in CSS). Please refer to Card Type "Constants" below for the list of possible values.<br/>- `visa`<br />- `master-card`<br />- `american-express`<br />- `diners-club`<br />- `discover`<br />- `jcb`<br />- `unionpay`<br />- `maestro` |
| `gaps`     | `Array`  | The expected indeces of gaps in a string representation of the card number. For example, in a Visa card, `4111 1111 1111 1111`, there are expected spaces in the 4th, 8th, and 12th positions. This is useful in setting your own formatting rules.                                                            |
| `lengths`  | `Array`  | The expected lengths of the card number as an array of strings (excluding spaces and `/` characters).                                                                                                                                                                                                          |
| `code`     | `Object` | The information regarding the security code for the determined card. Learn more about the [code object](#code) below.                                                                                                                                                                                          |

If no card types are found, this returns an empty array.

### `creditCardType.getTypeInfo(type: String)`

`getTypeInfo` will return a singular object (with the same structure as `creditCardType`) corresponding with the specified `type`, or undefined if the specified `type` is invalid/unknown.

### Card Type "Constants"

Named variables are provided for each of the supported card types:

* `VISA`
* `MASTERCARD`
* `AMERICAN_EXPRESS`
* `DINERS_CLUB`
* `DISCOVER`
* `JCB`
* `UNIONPAY`
* `MAESTRO`

#### `code`

Card brands provide different nomenclature for their security codes as well as varying lengths.

| Brand              | Name  | Size |
|--------------------|-------|------|
| `Visa`             | `CVV` | 3    |
| `MasterCard`       | `CVC` | 3    |
| `American Express` | `CID` | 4    |
| `Diners Club`      | `CVV` | 3    |
| `Discover`         | `CID` | 3    |
| `JCB`              | `CVV` | 3    |
| `UnionPay`         | `CVN` | 3    |
| `Maestro`          | `CVC` | 3    |

A full response for a `Visa` card will look like this:

```javascript
{
  niceType: 'Visa',
  type: 'visa',
  gaps: [ 4, 8, 12 ],
  lengths: [16],
  code: { name: 'CVV', size: 3 }
}
```

*Note:* The response also includes an `exactPattern` regex and a `prefixPattern` regex. These are used internally to determine the card type, but they should not be relied on and may be removed in the next major version.

### Advanced Usage

CommonJS:

```javascript
var creditCardType = require('credit-card-type');
var getTypeInfo = require('credit-card-type').getTypeInfo;
var CardType = require('credit-card-type').types;
```

ES6:

```javascript
import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';
```

#### Filtering

```javascript
creditCardType(cardNumber).filter(function(card) {
  return card.type == CardType.MASTERCARD || card.type == CardType.VISA;
});
```

#### Pretty Card Numbers

```javascript
function prettyCardNumber(cardNumber, cardType) {
  var card = getTypeInfo(cardType);

  if (card) {
    var offsets = [0].concat(card.gaps).concat([cardNumber.length]);
    var components = [];

    for (var i = 0; offsets[i] < cardNumber.length; i++) {
      var start = offsets[i];
      var end = Math.min(offsets[i + 1], cardNumber.length);
      components.push(cardNumber.substring(start, end));
    }

    return components.join(' ');
  }

  return cardNumber;
}

prettyCardNumber('xxxxxxxxxx343', CardType.AMERICAN_EXPRESS); // 'xxxx xxxxxx 343'
```

### Development

We use `nvm` for managing our node versions, but you do not have to. Replace any `nvm` references with the tool of your choice below.

```bash
nvm install
npm install
```

All testing dependencies will be installed upon `npm install` and the test suite executed with `npm test`.
