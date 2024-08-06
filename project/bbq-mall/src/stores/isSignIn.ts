import { atom, selector } from 'recoil';

import { getCachedSession } from '@/libs/customNextAuth';

export const isSignInStore = atom<boolean | undefined>({
  key: 'isSignInStore',
  default: undefined,
});

export const isSignInSelector = selector({
  key: 'isSignInSelector',
  get: async ({ get }) => {
    const isSignIn = get(isSignInStore);
    if (isSignIn === undefined) {
      const session = await getCachedSession();

      return !!session?.shopByToken;
    }
    return isSignIn;
  },
  set: ({ set }, value) => {
    return set(isSignInStore, value);
  },
});
