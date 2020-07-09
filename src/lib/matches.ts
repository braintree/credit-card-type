/*
 * Adapted from https://github.com/polvo-labs/card-type/blob/aaab11f80fa1939bccc8f24905a06ae3cd864356/src/cardType.js#L37-L42
 * */

function matchesRange(
  cardNumber: string,
  min: number | string,
  max: number | string
): boolean {
  const maxLengthToCheck = String(min).length;
  const substr = cardNumber.substr(0, maxLengthToCheck);
  const integerRepresentationOfCardNumber = parseInt(substr, 10);

  min = parseInt(String(min).substr(0, substr.length), 10);
  max = parseInt(String(max).substr(0, substr.length), 10);

  return (
    integerRepresentationOfCardNumber >= min &&
    integerRepresentationOfCardNumber <= max
  );
}

function matchesPattern(cardNumber: string, pattern: string | number): boolean {
  pattern = String(pattern);

  return (
    pattern.substring(0, cardNumber.length) ===
    cardNumber.substring(0, pattern.length)
  );
}

export function matches(
  cardNumber: string,
  pattern: string | number | string[] | number[]
): boolean {
  if (Array.isArray(pattern)) {
    return matchesRange(cardNumber, pattern[0], pattern[1]);
  }

  return matchesPattern(cardNumber, pattern);
}
