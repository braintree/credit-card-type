export function clone<T>(originalObject: T): T | null {
  if (!originalObject) {
    return null;
  }

  return JSON.parse(JSON.stringify(originalObject));
}
