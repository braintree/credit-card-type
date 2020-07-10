export function isValidInputType<T>(cardNumber: T): boolean {
  return typeof cardNumber === "string" || cardNumber instanceof String;
}
