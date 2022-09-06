// Promise에 기반한 Thunk를 만들어주는 함수입니다.
export const createPromiseThunk = (type, promiseCreator) => {
	const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
	return (param) => async (dispatch) => {
		dispatch({type, param}); // 요청이 시작됨 (액션 객체)
		try {
			const payload = await promiseCreator(param);
			dispatch({ type: SUCCESS, payload }); // 성공 (액션 객체)
		} catch(e){
			dispatch({type: ERROR, payload: e, error: true}); // 실패 (액션 객체)
		}
	};
};

export const reducerUtils = {
	inital: (initialDeta = null) => ({
		loading: false,
		data: initialDeta,
		error: null
	}),
	loading: (prevState = null) => ({
		loading: true,
		data: prevState,
		error: null
	}),
	success: payload => ({
		loading: false,
		data: payload,
		error: null
	}),
	error: error => ({
		loading: false,
		data: null,
		error: error
	})
};

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading()
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        };
      default:
        return state;
    }
  };
};