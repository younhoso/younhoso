import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./catSlice"

const store = configureStore({
	reducer: {
		cat: catReducer
	}
});

export default store;