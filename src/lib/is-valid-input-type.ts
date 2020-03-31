export default function isValidInputType(cardNumber): boolean {
  return typeof cardNumber === 'string' || cardNumber instanceof String;
}
