// Action Type
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// Actions
export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});

const initialState = 0;

//Reducer
export default function counter(state = initialState, action) {
	switch(action.type){
		case INCREASE:
			return state + 1;
		case DECREASE:
			return state - 1;
		default:
			return state;
	}
}