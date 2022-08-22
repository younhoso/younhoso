import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "@/modules/shoppingSlice"

const store = configureStore({
	reducer: {
		shopping: shoppingReducer //slice를 만든 Reducer을 추가해줍니다.
	}
});

export default store;