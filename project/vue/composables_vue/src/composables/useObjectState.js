import { reactive, toRefs } from 'vue';

/**
 * @param {object} initialValue 
 * @returns object, function
 * @example 
 * setup(){
 *   const [stateObject, setStateObject] = useObjectState({
 *     username: 'TriplxLab',
 *     age: 20,
 *     ...
 *   })
 *   return {...stateObject, setStateObject}
 *	}
*/
const useObjectState = (initialValue = {}) => {
  const text = 'useObjectState 인자로 넣는것은 Object로만 넣어야 합니다.'
  if(initialValue.constructor !== Object) {
    console.warn(text)
  }
  let stateObject = reactive(initialValue);
  const setStateObject = (newState) => {
    stateObject = newState(stateObject)
  }
  return [toRefs(stateObject), setStateObject];
};

export default useObjectState;