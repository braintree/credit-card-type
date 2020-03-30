export default function (originalObject: Object): Object {
  let dupe;

  if (!originalObject) {
    return null;
  }

  dupe = JSON.parse(JSON.stringify(originalObject));

  return dupe;
}
