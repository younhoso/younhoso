import { RecoilState, useResetRecoilState } from 'recoil';

import { removeLocalStorageItem } from '@/utils';

export function useResetRecoilStateWithLocalStorage<T>(atom: RecoilState<T>) {
  const resetState = useResetRecoilState(atom);

  // Recoil 상태를 초기화하고 localStorage에서 데이터 제거하기
  const resetAndRemoveLocalStorage = () => {
    resetState();
    removeLocalStorageItem(atom.key);
  };

  return resetAndRemoveLocalStorage;
}
