export const comma = (num: number) => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const uncomma = (str: String) => {
  return str.replace(/[^-.\d]/g, '');
};
