// 데이터를 localStorage에 저장하는 함수
export const setLocalStorageItem = (key: string, value: unknown, ttl?: number): void => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ value, ...(ttl && { exipire: new Date().getTime() + ttl }) }),
    );
  } catch (error) {
    console.error('localStorage에 데이터를 저장하는 동안 오류가 발생했습니다:', error);
  }
};

// localStorage에서 데이터를 가져오는 함수
export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const itemStr = localStorage.getItem(key);
    if (itemStr === null) {
      return null;
    }

    const item = JSON.parse(itemStr) as { value: T; exipire?: number };
    if (item.exipire && new Date().getTime() > item.exipire) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value ?? (item as T);
  } catch (error) {
    return null;
  }
};

// localStorage에서 데이터를 삭제하는 함수
export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('localStorage에서 데이터를 삭제하는 동안 오류가 발생했습니다:', error);
  }
};
