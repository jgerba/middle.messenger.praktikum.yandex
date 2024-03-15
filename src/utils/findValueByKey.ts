import isObject from './isObject.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export default function findValueByKey(
  object: IndexedType,
  key: string,
): IndexedType | undefined {
  if (object === null || object === undefined) {
    return object;
  }

  // key on current level
  if (key in object) {
    return object[key] as IndexedType;
  }

  // Return undefined if the key is not found
  let foundValue: IndexedType | undefined;

  // iterate deeper
  Object.keys(object).some((k) => {
    if (isObject(object[k])) {
      const result = findValueByKey(object[k] as IndexedType, key);

      if (result !== undefined) {
        foundValue = result;
        // Stop iterating
        return true;
      }
    }
    // Continue iterating
    return false;
  });

  return foundValue;
}
