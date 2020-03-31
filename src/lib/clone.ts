export default function (
  originalObject: Record<string, any>
): Record<string, any> {
  if (!originalObject) {
    return null;
  }

  const dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}
