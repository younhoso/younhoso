import {legacy_createStore as createStore, combineReducers} from "redux"
import cat from "./cat"

const rootReducer = combineReducers({cat});

const store = createStore(rootReducer);

export default store;