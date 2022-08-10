import { createSlice } from "@reduxjs/toolkit";

// 액션 타입, 액션 생성함수, 초기값을 한번에 묶어서 사용할수 있습니다.
const catSlice = createSlice({
	name: 'cat', //slice를 한마디로 정의하는 키워드
	initialState: { // 초기 값
		name: "TriplexLab", 
		age: 100
	},
	reducers : { // action 생성 함수
		changeName: (state, action) => {
			state.name = action.payload
		}
	}
});

export const { changeName } = catSlice.actions
export default catSlice.reducer;
