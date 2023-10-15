import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: 'dark',
});