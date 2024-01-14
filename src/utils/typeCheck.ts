export const checkIfIsArray = <T>(value: any): value is Array<T> => {
  return Array.isArray(value);
};
