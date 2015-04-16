Credit Card Type [![Build Status](https://travis-ci.org/braintree/credit-card-type.svg)](https://travis-ci.org/braintree/credit-card-type) [![npm version](https://badge.fury.io/js/credit-card-type.svg)](http://badge.fury.io/js/credit-card-type)
================

Credit Card Type provides a useful utility method for determining a credit card type from both fully qualified and partial numbers. This is not a validation library but rather a smaller component to help you build your own validation or UI library.

This library is designed for type-as-you-go detection (supports partial numbers) and is written in CommonJS so you can use it in Node, io.js, and the [browser](http://browserify.org).

## Example

```javascript
var getCardType = require('credit-card-type');

var card = getCardType('4111');

console.log(card.type); // 'visa'
```

## API

### `getCardType(number: String)`

`getCardType` will return an Object with the following data:

| Key | Value | Description |
| --- | ----- | ----------- |
| `niceType` | `String` | A pretty printed represention of the card brand.<br/>- `Visa`<br />- `MasterCard`<br />- `American Express`<br />- `DinersClub`<br />- `Discover`<br />- `JCB` |
| `type` | `String` | A code-friendly presentation of the card brand (useful to class names in CSS).<br/>- `visa`<br />- `master-card`<br />- `american-express`<br />- `diners-club`<br />- `discover`<br />- `jcb` |
| `pattern` | `RegExp` | The regular expression used to determine the card type. |
| `gaps` | `Array` | The expected indeces of gaps in a string representation of the card number. For example, in a Visa card, `4111 1111 1111 1111`, there are expected spaces in the 4th, 8th, and 12th positions. This is useful in setting your own formatting rules. |
| `length` | `Integer` | The expected length of the card number string (excluding spaces and `/` characters). |
| `code` | `Object` | The information regarding the security code for the determined card. Learn more about the [code object](#code) below. |

#### `code`

Card brands provide different nomenclature for their security codes as well as varying lengths.

| Brand | Name | Size |
| ----- | ---- | ---- |
| `Visa` | `CVV` | 3 |
| `MasterCard` | `CVC` | 3 |
| `American Express` | `CID` | 4 |
| `DinersClub` | `CVV` | 3 |
| `Discover` | `CID` | 3 |
| `JCB` | `CVV` | 3 |

A full response for a `Visa` card will look like this:

```js
{
  niceType: 'Visa',
  type: 'visa',
  pattern: '^4[0-9][\\s\\d]*$',
  gaps: [ 4, 8, 12 ],
  length: 16,
  code: { name: 'CVV', size: 3 }
}
```

### Development

We use `nvm` for managing our node versions, but you do not have to. Replace any `nvm` references with the tool of your choice below.

```
nvm install
npm install
```

All testing dependencies will be installed upon `npm install` and the test suite executed with `npm test`.
