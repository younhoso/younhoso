import { v1 } from 'uuid';

export const buildStoreKey = (key: string): string => {
  if (!process.env.NEXT_PUBLIC_MODE || process.env.NEXT_PUBLIC_MODE === 'local') {
    return `${key}/${v1()}`;
  } else {
    return key;
  }
};
