// defines a type with generic type T
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type PlainObject<T = any> = {
  [k in string]: T;
};

// type guard - checks if a value is a plain object
function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null && // not null (since typeof null is "object")
    value.constructor === Object && // its constructor is Object (ensuring it's a plain object)
    Object.prototype.toString.call(value) === '[object Object]' // its string representation matches a plain object
  );
}

// type guard -  checks if a value is an array
function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

// type guard - checks if a value is array / plain object
function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

// checks if two plain objects (leftObj and rightObj) are equal
export default function isEqual(leftObj: PlainObject, rightObj: PlainObject) {
  // early exit if one of values is undefined
  if (
    (leftObj === undefined && rightObj !== undefined) ||
    (leftObj !== undefined && rightObj === undefined)
  ) {
    return false;
  }

  // early exit if the number of keys is different
  if (Object?.keys(leftObj).length !== Object?.keys(rightObj).length) {
    return false;
  }

  // iterate through all key-value pairs of the left object
  /* eslint-disable-next-line no-restricted-syntax */
  for (const [key, value] of Object.entries(leftObj)) {
    // get the corresponding value from the right object
    const rightValue = rightObj[key];

    // if both values are array / plain object => use recursive check
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // if the recursive check returns true, continue to the next iteration
      if (isEqual(value, rightValue)) {
        /* eslint-disable-next-line no-continue */
        continue;
      }

      // if the recursive check returns false, return false immediately
      return false;
    }

    // if both values are not arrays / objects => check strictly equality
    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
