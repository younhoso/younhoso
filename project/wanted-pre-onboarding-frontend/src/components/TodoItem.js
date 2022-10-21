import React from 'react';
import styled, {css} from 'styled-components';
import {MdDone, MdDelete, MdOutlineEditNote} from 'react-icons/md';
import { apis } from "../store/api";

const TodoItem = ({id, done, text, onEdit, setItems}) => {
	const onRemove = async () => {
		setItems((prev) => prev.filter(todo => todo.id !== id));
		await apis.deleteTodo(id);
	};
	
	const onToggle = () => {
		setItems((prev) => prev.map(todo => todo.id === id ? {...todo, isCompleted: !done} : todo))
	};

	const handleEditClick = () => {
		onEdit(id);
	};

	return (
		<TodoItemBlock>
			<CheckCircle done={done} onClick={onToggle}>{done && <MdDone />}</CheckCircle>
			<Text done={done}>{text}</Text>
			<Edit onClick={handleEditClick}>
				<MdOutlineEditNote />
			</Edit>
			<Remove onClick={onRemove}>
				<MdDelete />
			</Remove>
		</TodoItemBlock>
	);
}

const Edit = styled.div`
	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #dee2e6;
	font-size: 24px;
	cursor: pointer;
	&:hover {
		color: #ff6b6b;
	}
`;

const Remove = styled.div`
	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #dee2e6;
	font-size: 24px;
	cursor: pointer;
	&:hover {
		color: #ff6b6b;
	}
`;

const CheckCircle = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 16px;
	border: 1px solid #ced4da;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
	cursor: pointer;
	${props => props.done && css`
		border: 1px solid #38d9a9;
		color: #38d9a9;
	`}
`;

const Text = styled.div`
	flex: 1;
	font-size: 21px;
	color: #495057;
	${props => props.done && css`
		color: #d9d9d9;
	`}
`;

const TodoItemBlock = styled.div`
	display: flex;
	align-items: center;
	padding-top: 12px;
	padding-bottom: 12px;
	&:hover {
		${Edit},${Remove} {
			opacity: 1;
		}
	}
`;

export default React.memo(TodoItem);