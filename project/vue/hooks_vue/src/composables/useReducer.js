import { readonly, ref } from 'vue';

/**
 * useReducer은 경우수가 많은 UI를 핸들링할때 사용할 용도 
 * 예를 들어서 동의, 비동의, ALL동의 등등의 체크해야 할 경우
 * @param {function} reducer 
 * @param {object} initialArg
 * @returns object, function
 * @example
 * ```
 * // src/common/computed.js
  const initialState = { count: 0 }
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + action.mode.step }
      case 'decrement':
        return { count: state.count - action.mode.step }
      default:
        throw new Error('잘못된 타입 입니다!')
    }
  }
  export {initialState, reducer};
  ```
  ```
  // src/components/사용하는컴포넌트.vue
  const [state, dispatch] = useReducer(reducer, initialState);
  ```
 */
const useReducer = (reducer, initialArg) => {
  const state = ref(initialArg);
  const dispatch = (action) => {
    state.value = reducer(state.value, action);
  };

  return [readonly(state), dispatch];
}

export default useReducer;