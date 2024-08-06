// 데이터를 localStorage에 저장하는 함수
export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // console.error('localStorage에 데이터를 저장하는 동안 오류가 발생했습니다:', error);
  }
};

// localStorage에서 데이터를 가져오는 함수
export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    // console.error('localStorage에서 데이터를 가져오는 동안 오류가 발생했습니다:', error);
    return null;
  }
};

// localStorage에서 데이터를 삭제하는 함수
export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // console.error('localStorage에서 데이터를 삭제하는 동안 오류가 발생했습니다:', error);
  }
};
