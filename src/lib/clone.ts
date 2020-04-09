export default function <T>(originalObject: T): T | null {
  if (!originalObject) {
    return null;
  }

  const dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}
