const insertIf = (
  condition: any,
  obj: Record<any, any>
): Record<any, any> | undefined => {
  if (condition) {
    return obj;
  }

  return undefined;
};

export { insertIf };
