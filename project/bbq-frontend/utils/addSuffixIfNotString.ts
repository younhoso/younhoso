const addSuffixIfNotString = function (value: any, suffix: string): string {
  if (typeof value === 'string') {
    return value;
  }

  return `${value}${suffix}`;
};

export { addSuffixIfNotString };
