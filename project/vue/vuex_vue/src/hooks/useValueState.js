import { ref } from 'vue';

const useValueState = (initialValue) => {
  let state = null;
  const text = 'useValueState 인자로 넣는것은 값만 넣어야 합니다.'
  if(initialValue.constructor === Object){
    console.warn(text)
  } 
  if(Array.isArray(initialValue)) {
    console.warn(text)
  }
  state = ref(initialValue);
  
  const setState = (newValue) => {
    state.value = newValue
  }
  return [state, setState];
};

export default useValueState;