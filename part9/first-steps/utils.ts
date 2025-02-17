export const isNotNumber = (argument: string | number): boolean => {
  return isNaN(Number(argument));
};
