import isObject from './isObject';

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

  // key on cuurent level
  if (object.hasOwnProperty(key)) {
    return object[key] as IndexedType;
  }

  // iterate deeper
  for (let k in object) {
    if (isObject(object[k])) {
      const result = findValueByKey(object[k] as IndexedType, key);
      if (result) {
        return result;
      }
    }
  }

  // return undefined if not found
  return undefined;
}
