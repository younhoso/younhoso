import { atom } from 'recoil';

export const isNotWebviewStore = atom<boolean>({
  key: 'isNotWebview',
  default: false,
});
