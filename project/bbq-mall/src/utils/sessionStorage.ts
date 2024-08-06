export const GUEST_TOKEN = 'guestToken';

export const getSessionStorageItem = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    return null;
  }
};

export const setSessionStorageItem = <T>(key: string, value: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('session storage에 데이터를 저장하는 동안 오류가 발생했습니다:', error);
  }
};

export const removeSessionStorageItem = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('sessionStorage에서 데이터를 삭제하는 동안 오류가 발생했습니다:', error);
  }
};
