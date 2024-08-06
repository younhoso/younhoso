export const numberToRem = (number: number, per: number) => {
  return (number * per) / 16 + 'rem';
};
