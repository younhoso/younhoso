import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface ShoppingState {
	"startDate": string,
	"endDate": string,
	"timeUnit": string,
	"category": string,
	"keyword": string,
	"device": string,
	"gender": string,
	"ages": []
}

const initialState = { 
	"startDate": "",
	"endDate": "",
	"timeUnit": "",
	"category": "",
	"keyword": "",
	"device": "",
	"gender": "",
	"ages": []
} as ShoppingState

const shoppingSlice = createSlice({
	name: 'Shopping Insight',
	initialState,
	reducers : {
		add: (state, action: PayloadAction<ShoppingState>) => {  // action 생성 함수
			state.startDate = action.payload.startDate; //👈🏻 불변성 유지를 직접 할 필요가 없이(바로 값을 할당시킴). 
			state.endDate = action.payload.endDate; //👈🏻 불변성 유지를 직접 할 필요가 없이(바로 값을 할당시킴). 
		}
	}
});

export const { add } = shoppingSlice.actions;
export default shoppingSlice.reducer;