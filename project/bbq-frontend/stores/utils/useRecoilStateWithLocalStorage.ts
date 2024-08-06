import { useEffect } from 'react';

import { RecoilState, SetterOrUpdater, useRecoilState } from 'recoil';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils';

export function useRecoilStateWithLocalStorage<T>(atom: RecoilState<T>): [T, SetterOrUpdater<T>] {
  const [state, setState] = useRecoilState(atom);

  // localStorage에서 데이터 가져오기
  useEffect(() => {
    const savedState = getLocalStorageItem<T>(atom.key);
    if (savedState !== null) {
      setState(savedState);
    }
  }, [atom.key, setState]);

  // Recoil 상태가 변경될 때 localStorage에 저장하기
  useEffect(() => {
    setLocalStorageItem(atom.key, state);
  }, [atom.key, state]);

  return [state, setState];
}
