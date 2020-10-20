# 9.1.0

- Add additional Hiper bins (#115 thanks @upigilam)

# 9.0.1

- Correct issue where ELO cards were misidentified as Maestro cards (thanks @gabrielozaki)

# 9.0.0

- Add typescript types

_Breaking Changes_

- Drop Bower Support
- Drop support for card numbers instantiated with `new String(number)`

# 8.3.0

- Add support for series 8 UnionPay cards (fixes #95 thanks @leebradley)

# 8.2.0

- Add 14 and 15 length configuration to UnionPay cards

# 8.1.0

- Add support for Hiper cards
- Add support for Hipercard cards

# 8.0.0

- Improve pattern recognition for card types

_Breaking Changes_

- When adding or updating cards, this module no longer uses an `exactPattern` and `prefixPattern` model. Instead, it takes an array of patterns. See https://github.com/braintree/credit-card-type#pattern-detection for details.

# 7.1.0

- Add support for `Elo` card type
- Adds `updateCard` method (#77)

# 7.0.0

- Updates "master-card" enum to "mastercard"

# 6.3.0

- Add support for `MIR` card type (thanks @antongolub)

# 6.2.0

- Allow custom card brands to be added

# 6.1.1

- Correct Mastercard bin range for series 2 bins

# 6.1.0

- Add support for JCB cards of length 17, 18, and 19 (#54, thanks @zeh)

# 6.0.0

- Update mastercard niceType property to `Mastercard` to match new brand guidelines

**Breaking Changes**

- Remove internal properties `prefixPattern` and `exactPattern` from returned object

# 5.0.4

- Correct Discover to respect lengths for international cards
- Make Maestro pattern more exact

# 5.0.3

- Fix prefix pattern for MasterCard numbers starting with `27`

# 5.0.2

- Fix checking for UnionPay ranges

# 5.0.1

- Visa cards can now be 16, 18, or 19 digits.

# 5.0.0

- Card matching has been replaced with a two-tier process. This simplifies the matching process for ambiguous numbers.

- Partial BIN matches (`prefixPattern`) are accumulated separately from exact BIN matches (`exactPattern`).
- If there were any exact BIN matches, those matches are returned.
- If there are no exact BIN matches, all partial matches are returned.

# 4.1.0

- Add `getTypeInfo` and `types` exports for getting type information such as number spacing given a type string such as `visa`.

# 4.0.3

- Remove behavior where some UnionPay cards displayed Discover and UnionPay as possible card types

# 4.0.2

- Add support for series 2 MasterCard bins (ranging from 222100 to 272099)
- Removes dependency on Lodash

# 4.0.1

- Switch to one version of Lodash

# 4.0.0

- Further resolve ambiguity issues with various cards; return an array of potential card types instead of a single type

# 3.0.0

- Resolve ambiguity issues with Maestro and Discover cards

# 2.0.0

- Add support for Maestro and UnionPay
- Change return type of `length` as a `String` to `lengths` as an `Array`

# 1.0.0

- Initial Release
