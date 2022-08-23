import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "./shoppingSlice"

const store = configureStore({
	reducer: {
		shopping: shoppingReducer //Slice를 만든 Reducer을 추가해줍니다.
	}
});

export type AppDispatch = typeof store.dispatch

export default store;