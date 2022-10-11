import React from 'react';
import { useSetRecoilState } from 'recoil';
import {Categories, IToDo, toDoState} from '../atoms';

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
				...oldToDos.slice(targetIndex + 1) // 그리고 target 이후의 나머지 모든 원소들도 들어감.
			]
		})
	};
	return (
			<li>
			 	<span>{text}</span>
				{ category !== Categories.DOING && (
					<button name={Categories.DOING} onClick={onClick}>Doing</button> 
				)}
				{ category !== Categories.TO_DO && (
					<button name={Categories.TO_DO} onClick={onClick}>To Do</button>
				)}
				{ category !== Categories.DONE && (
					<button name={Categories.DONE} onClick={onClick}>Done</button> 
				)}
			</li>
	)
}

export default ToDo;