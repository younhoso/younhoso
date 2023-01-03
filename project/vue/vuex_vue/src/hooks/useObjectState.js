import { reactive } from 'vue';

const useObjectState = (initialValue) => {
  const text = 'useObjectState 인자로 넣는것은 Object로만 넣어야 합니다.'
  if(initialValue.constructor !== Object) {
    console.warn(text)
  }
  let state = reactive(initialValue);
  const setState = (newValue) => {
    state = newValue
  }
  return [state, setState];
};

export default useObjectState;