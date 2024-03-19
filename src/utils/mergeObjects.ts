import isObject from './isObject.ts';

import { IndexedType } from '../core/types.ts';

export default function mergeObjects(
  leftObj: IndexedType,
  rightObj: IndexedType,
): IndexedType {
  const result: IndexedType = { ...leftObj };

  Object.keys(rightObj).forEach((key) => {
    const rightVal = rightObj[key];
    const leftVal = leftObj[key];

    // Check if both values are objects
    if (isObject(rightVal) && isObject(leftVal)) {
      result[key] = mergeObjects(
        leftVal as IndexedType,
        rightVal as IndexedType,
      );
    } else {
      // If one of them is not an object (string or number),
      // overwrite the left value with the right one
      result[key] = rightVal;
    }
  });

  return result;
}
