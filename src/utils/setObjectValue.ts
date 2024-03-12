import isObject from './isObject.ts';
import mergeObjects from './mergeObjects.ts';

type IndexedType = {
  [key: string]: string | number | IndexedType;
};

export default function setObjectValue(
  object: IndexedType,
  path: string,
  value: unknown,
): IndexedType {
  // check if object is not obj or null

  if (!isObject(object) || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const resultObject = path.split('.').reduceRight(
    // create new obj, where every key is put inside previous key, form right to left, first key has a value
    // [key-last]:value => [key-[last-1]]: acc ([key1]:value)...
    (acc, key) => ({
      [key]: acc,
    }),
    value,
  );

  return mergeObjects(object, resultObject as IndexedType);
}
