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

| Key        | Type     | Description                                                                                                                                                                                                                                                                                                                                                                  |
|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `niceType` | `String` | A pretty printed representation of the card brand.<br/>- `Visa`<br />- `Mastercard`<br />- `American Express`<br />- `Diners Club`<br />- `Discover`<br />- `JCB`<br />- `UnionPay`<br />- `Maestro`<br />- `Mir`<br />- `Elo`<br />- `Hiper`<br />- `Hipercard`                                                                                                             |
| `type`     | `String` | A code-friendly presentation of the card brand (useful to class names in CSS). Please refer to Card Type "Constants" below for the list of possible values.<br/>- `visa`<br />- `mastercard`<br />- `american-express`<br />- `diners-club`<br />- `discover`<br />- `jcb`<br />- `unionpay`<br />- `maestro`<br />- `mir`<br /> - `elo`<br /> - `hiper`<br /> - `hipercard` |
| `gaps`     | `Array`  | The expected indeces of gaps in a string representation of the card number. For example, in a Visa card, `4111 1111 1111 1111`, there are expected spaces in the 4th, 8th, and 12th positions. This is useful in setting your own formatting rules.                                                                                                                          |
| `lengths`  | `Array`  | The expected lengths of the card number as an array of strings (excluding spaces and `/` characters).                                                                                                                                                                                                                                                                        |
| `code`     | `Object` | The information regarding the security code for the determined card. Learn more about the [code object](#code) below.                                                                                                                                                                                                                                                        |

If no card types are found, this returns an empty array.

### `creditCardType.getTypeInfo(type: String)`

`getTypeInfo` will return a singular object (with the same structure as `creditCardType`) corresponding with the specified `type`, or undefined if the specified `type` is invalid/unknown.

### Card Type "Constants"

Named variables are provided for each of the supported card types:

* `AMERICAN_EXPRESS`
* `DINERS_CLUB`
* `DISCOVER`
* `ELO`
* `HIPERCARD`
* `HIPER`
* `JCB`
* `MAESTRO`
* `MASTERCARD`
* `MIR`
* `UNIONPAY`
* `VISA`

#### `code`

Card brands provide different nomenclature for their security codes as well as varying lengths.

| Brand              | Name  | Size |
|--------------------|-------|------|
| `Visa`             | `CVV` | 3    |
| `Mastercard`       | `CVC` | 3    |
| `American Express` | `CID` | 4    |
| `Diners Club`      | `CVV` | 3    |
| `Discover`         | `CID` | 3    |
| `JCB`              | `CVV` | 3    |
| `UnionPay`         | `CVN` | 3    |
| `Maestro`          | `CVC` | 3    |
| `Mir`              | `CVP2` | 3    |
| `Elo`              | `CVE` | 3    |
| `Hiper`            | `CVC` | 3    |
| `Hipercard`        | `CVC` | 4    |

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

#### Pattern Detection

Each card type has a `patterns` attribute that is an array of numbers and ranges of numbers (represented by an array of 2 values, a min and a max).

If the pattern is a number, the modules compares it against the card number. Partial matches for card numbers that are shorter than the pattern also match. Given the pattern `123`, then the card numbers `1`, `12`, `123`, `1234` will all match, but `2`, `13`, and `124` will not.

If the pattern is an array of numbers, then the card number is checked to be within the range of those numbers. Again, partial matches are accepted. Given the range `[100, 123]`, then the card numbers `1`, `10`, `100`, `12`, `120`,
`123` will all match, but `2`, `13`, and `124` will not.

For detection, the module loops over each card type's `patterns` array, and if a match occurs, that card type is added to the array of results.

In the case where multiple matches are made, if the entirety of the pattern is matched, the card type with the stronger pattern is preferred. For instance, Visa cards match anything that starts with a 4, but there are
some Elo cards that begin with a 4. One example is `401178`. So for the card
numbers, `4`, `40`, `401`, `4011`, `40117`, the module will report that this
card is _either_ a Visa or an Elo card. Once the card number becomes `401178`,
the modules sees that an exact match for the ELO bin has been made, and the module reports
that the card can only be an Elo card.

#### Adding Card Types

You can add additional card brands not supportted by the the module with `addCard`. Pass in the configuration object.

```javascript
creditCardType.addCard({
  niceType: 'NewCard',
  type: 'new-card',
  patterns: [
    2345,
    2376
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
});
```

If you add a card that already exists in the module, it will overwrite it.

```javascript
creditCardType.addCard({
  niceType: 'Visa with Custom Nice Type',
  type: creditCardType.types.VISA,
  patterns: [
    41111,
    [44, 47]
  ],
  gaps: [4, 8, 12],
  lengths: [13, 16, 19], // add support for old, deprecated 13 digit visas
  code: {
    name: 'CVV',
    size: 3
  }
});
```

Adding new cards puts them at the bottom of the priority for testing. Priority is determined by an array. By default, the priority looks like:

```javascript
[
  creditCardType.types.VISA,
  creditCardType.types.MASTERCARD,
  creditCardType.types.AMERICAN_EXPRESS,
  creditCardType.types.DINERS_CLUB,
  creditCardType.types.DISCOVER,
  creditCardType.types.JCB,
  creditCardType.types.UNIONPAY,
  creditCardType.types.MAESTRO,
  creditCardType.types.ELO,
  creditCardType.types.MIR,
  creditCardType.types.HIPER,
  creditCardType.types.HIPERCARD
]
```

You can adjust the order using `changeOrder`. The number you pass in as the second argument is where the card is inserted into the array. The closer to the beginning of the array, the higher priority it has.

```javascript
creditCardType.changeOrder('my-new-card', 0); // give custom card type the highest priority
creditCardType.changeOrder('my-new-card', 3); // give it a priority at position 3 in the test order array
```

You can also remove cards with `removeCard`.

```javscript
creditCardType.removeCard(creditCardType.types.VISA);
```

If you need to reset the modifications you have created, simply call `resetModifications`:

```javascript
creditCardType.resetModifications();
```

#### Updating Card Types

You can update cards with `updateCard`. Pass in the card type and the configuration object. Any properties left off will inherit from the original card object.

```javascript
creditCardType.updateCard(creditCardType.types.VISA, {
  niceType: 'Fancy Visa',
  lengths: [11, 16]
});

var visa = creditCardType.getTypeInfo(creditCardType.types.VISA);

// overwritten properties
visa.niceType; // 'Fancy Visa'
visa.length; // [11, 16]

// unchanged properties
visa.gaps // [4, 8, 12]
visa.code.name // 'CVV'
```

If you need to reset the modifications you have created, simply call `resetModifications`:

```javascript
creditCardType.resetModifications();
```

#### Pretty Card Numbers

```javascript
function prettyCardNumber(cardNumber, cardType) {
  var card = getTypeInfo(cardType);

  if (card) {
    var offsets = [].concat(0, card.gaps, cardNumber.length);
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
