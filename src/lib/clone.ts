const hasStructedClone = 'structuredClone' in globalThis;
export function clone<T>(originalObject: T): T | null {
  if (!originalObject) {
    return null;
  }

  if (hasStructedClone){
    return structedClone(originalObject);
  }

  return JSON.parse(JSON.stringify(originalObject));
}
