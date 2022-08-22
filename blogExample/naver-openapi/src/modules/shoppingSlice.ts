import { createSlice } from "@reduxjs/toolkit";
import store from "./configStore";

const shoppingSlice = createSlice({
	name: 'Shopping Insight',
	initialState: { // 초기 값
		startDate: "초기값", 
		endDate: "",
		timeUnit: "",
		category: "",
		keyword: "",
		device: "",
		gender: "",
		ages: ""
	},
	reducers : { // action 생성 함수
		changeName: (state, action) => {
			state.startDate = action.payload; //👈🏻 불변성 유지를 우리가 직접 할 필요가 없습. 
		}
	}
});

export type RootState = ReturnType<typeof store.getState>
export const { changeName } = shoppingSlice.actions;
export default shoppingSlice.reducer;