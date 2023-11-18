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