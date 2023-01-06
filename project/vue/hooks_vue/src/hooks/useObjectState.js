import { readonly, reactive } from 'vue';

/**
 * @param {object} initialValue 
 * @returns object, function
 * @example 
 * const [stateObject, setStateObject] = useObjectState({init:0});
 */
const useObjectState = (initialValue = {}) => {
  const text = 'useObjectState 인자로 넣는것은 Object로만 넣어야 합니다.'
  if(initialValue.constructor !== Object) {
    console.warn(text)
  }
  let stateObject = reactive({...initialValue}); //원시 Object를 깊은 복사함.
  const setStateObject = (newState) => {
    stateObject = newState
  }
  return [readonly(stateObject), setStateObject];
};

export default useObjectState;