const isValid = function (value: any): true | false {
  if (typeof value === 'undefined') {
    return false;
  }

  if (typeof value === 'number' && isNaN(value)) {
    return false;
  }

  return true;
};

export { isValid };
