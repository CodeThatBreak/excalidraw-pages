type Primitive = null | undefined | string | number | boolean | symbol | bigint;

const isPrimitive = (value: unknown): value is Primitive => {
  return (
    value === null || (typeof value !== "object" && typeof value !== "function")
  );
};

const deepEqual = <T>(a: T, b: T): boolean => {
  if (isPrimitive(a) || isPrimitive(b)) {
    return a === b;
  }

  // Check if both are arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  // Check if both are objects and have the same keys
  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null
  ) {
    const keysA = Object.keys(a) as (keyof T)[];
    const keysB = Object.keys(b) as (keyof T)[];

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => {
      if (!(key in b)) return false;
      return deepEqual(a[key], b[key]);
    });
  }

  return false;
};

export { deepEqual };
