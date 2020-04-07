export default function (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalObject: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  if (!originalObject) {
    return null;
  }

  const dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}
