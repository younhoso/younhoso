import React from 'react';
import { useSetRecoilState } from 'recoil';
import {IToDo, toDoState} from '../atoms';

function ToDo({text, category, id}: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { currentTarget: { name } } = event;
		setToDos(oldToDos => {
			const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
			const newToDo = {
				text,
				id,
				category: name as any
			}
			return [
				...oldToDos.slice(0, targetIndex), // 새 배열에는 target 이전의 모든 원소들이 들어가고,
				newToDo, // 새로운 ToDo 들어가고,
				...oldToDos.slice(targetIndex + 1) // 그리고 target 이후의 모든 원소들도 들어감.
			]
		})
	};
	return (
			<li>
			 	<span>{text}</span>
				{ category !== "DOING" && (
					<button name="DOING" onClick={onClick}>Doing</button> 
				)}
				{ category !== "TO_DO" && (
					<button name="TO_DO" onClick={onClick}>To Do</button>
				)}
				{ category !== "DONE" && (
					<button name="DONE" onClick={onClick}>Done</button> 
				)}
			</li>
	)
}

export default ToDo;