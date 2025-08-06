export function clone<T>(originalObject: T): T | null {
  if (!originalObject) {
    // TODO: update`
    return null;
  }

  return JSON.parse(JSON.stringify(originalObject));
}
