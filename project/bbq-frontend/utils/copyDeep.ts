const copyDeep = function <T>(value: any): T {
  return JSON.parse(JSON.stringify(value));
};

export { copyDeep };
