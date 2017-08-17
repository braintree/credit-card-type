5.0.4
=====

- Correct Discover to respect lengths for international cards
- Make Maestro pattern more exact

5.0.3
=====

- Fix prefix pattern for MasterCard numbers starting with `27`

5.0.2
=====

- Fix checking for UnionPay ranges

5.0.1
=====

- Visa cards can now be 16, 18, or 19 digits.

5.0.0
=====

- Card matching has been replaced with a two-tier process. This simplifies the matching process for ambiguous numbers.
  - Partial BIN matches (`prefixPattern`) are accumulated separately from exact BIN matches (`exactPattern`).
  - If there were any exact BIN matches, those matches are returned.
  - If there are no exact BIN matches, all partial matches are returned.

4.1.0
=====

- Add `getTypeInfo` and `types` exports for getting type information such as number spacing given a type string such as `visa`.

4.0.3
=====

- Remove behavior where some UnionPay cards displayed Discover and UnionPay as possible card types

4.0.2
=====

- Removes dependency on Lodash

4.0.1
=====

- Switch to one version of Lodash

4.0.0
=====

- Further resolve ambiguity issues with various cards; return an array of potential card types instead of a single type

3.0.0
=====

- Resolve ambiguity issues with Maestro and Discover cards

2.0.0
=====

- Add support for Maestro and UnionPay
- Change return type of `length` as a `String` to `lengths` as an `Array`

1.0.0
=====

- Initial Release
