export const common = {
  getLocalStorage: function(key) {
    // `key` 매개변수를 받아와서 localStorage에서 해당 키의 값을 가져옴
    try {
      let value;
      if (typeof window !== 'undefined') {
        value = window.localStorage.getItem(key);
      }
      return JSON.parse(value); // 해당 키에 대한 값을 반환
    } catch (error) {
      // console.error('Error parsing JSON:', error);
    }
  },
  saveLocalStorage: function(key, value) {
     // `key`와 `value` 매개변수를 받아와서 localStorage에 데이터 저장
     if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
     }
  }
}