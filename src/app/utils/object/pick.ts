type PickKeys<T extends object, K extends keyof T> = {
  [P in K]: T[P];
};

const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): PickKeys<T, K> => {
  const result = {} as PickKeys<T, K>;

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result;
};

export { pick };
