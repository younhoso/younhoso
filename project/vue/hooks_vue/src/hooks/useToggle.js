import { ref } from 'vue';

/**
 * @param {boolean} initialValue 
 * @returns boolean, function
 * @example 
 * const [state, setState] = useToggle(false);
 */
const useToggle = (initialValue = false) => {
  const text = 'useValueState 인자로 넣는것은 boolean값만 넣어야 합니다.'
  if(initialValue.constructor === Object){
    console.warn(text)
  } 
  if(Array.isArray(initialValue)) {
    console.warn(text)
  }
  const state = ref(initialValue);
  const setState = () => {
    state.value = !state.value
  }

  return [state, setState]
};

export default useToggle;