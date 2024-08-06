import { camelToSnakeCase } from './camelToSnakeCase';

export const getObjectBeParams = (obj: Record<string, unknown>, camelToSnake?: boolean) => {
  return (
    '?' +
    Object.entries(obj)
      .map(([key, value]) => `${camelToSnake ? camelToSnakeCase(key) : key}=${value}`)
      .join('&')
  );
};
