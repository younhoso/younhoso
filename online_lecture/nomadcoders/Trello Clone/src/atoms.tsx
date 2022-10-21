import { atom, selector } from "recoil";

export const minuteState = atom({
	key: "minutes",
	default: 0,
});

export const hourSelector = selector<number>({
	key: "hours",
	get: ({get}) => {
		const minutes = get(minuteState); //minuteState(기본 값)을 돌려주는 의미
		return minutes / 60;
	},
	set: ({set}, newValue) => {
		const minutes = Number(newValue) * 60;
		set(minuteState, minutes) //minuteState(기본 값)을 minutes(바꿀려는값)으로 바꾸겠다는 의미
	}
});