import { atom, selector } from "recoil";

export const toDoState = atom({
	key: "toDo",
	default: ["A", "B", "C", "D", "E"]
});