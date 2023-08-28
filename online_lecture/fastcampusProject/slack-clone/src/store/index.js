import { combineReducers } from 'redux';
import userReducer from './useReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;