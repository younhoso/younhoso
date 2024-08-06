export const objectToQueryString = (obj: { [key: string]: any }) => {
  if (!obj || !Object.keys(obj).length) return '';

  const str =
    '?' +
    Object.keys(obj)
      .filter(key => {
        const value = obj[key];
        if (value === null) return false;
        if (typeof value === 'number' && isNaN(value)) return false;
        if (typeof value === 'undefined') return false;
        return true;
      })
      .map(key => {
        return `${key}=${encodeURIComponent(obj[key])}`;
      })
      .join('&');

  return str;
};
