export default function <T>(originalObject: T): T | null {
  if (!originalObject) {
    return null;
  }

  return JSON.parse(JSON.stringify(originalObject));
}
