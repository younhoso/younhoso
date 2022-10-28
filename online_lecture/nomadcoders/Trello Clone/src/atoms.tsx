import { atom } from "recoil";

/* default object안에 추가 되거나, 삭제 되거나 동적으로 만들기 위해서
	다음과 같이 타입을 지정해줄수 있습니다. */
interface IToDoState {
	[key: string]: string[]
}

export const toDoState = atom<IToDoState>({
	key: "toDo",
	default: {
		to_do: ["A", "D",],
		doing: ["B", "C",],
		done: ["E"]
	}
});