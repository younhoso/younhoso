import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import {MdAdd} from 'react-icons/md';
import TodoForm from './TodoForm';

const TodoCreate = ({ onCreate, setItems }) => {
	const [open, setOpen] = useState(false);
	const onToggle = () => setOpen(!open);

	return (
		<>
		{open && (
			<InsertFormPositioner>
				<TodoForm onCreate={onCreate} setItems={setItems} setOpen={onToggle}/>
			</InsertFormPositioner>
		)}
		<CircleButton onClick={onToggle} open={open}>
			<MdAdd />
		</CircleButton>
		</>
	);
}

const CircleButton = styled.button`
	background-color: #38d9a9;
	&:hober {
		background-color: #38d9a9;
	}
	&:active {
		background-color: #20c997;
	}
	z-index: 5;
	cursor: pointer;
	width: 80px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 50%;
	bottom: 0;
	transform: translate(-50%, 50%);
	font-size: 60px;
	color: white;
	border-radius: 50%;
	border: none;
	outline: none;
	transition: 0.125s all ease-in-out;

	${props => props.open && css `
		background-color: #ff6b6b;
		&:hover {
			background-color: #ff8787;
		}
		&:active {
			background-color: #fa5252;
		}
		transform: translate(-50%, 50%) rotate(45deg);
	`}
`;

const InsertFormPositioner = styled.div`
	width: 100%;
	bottom: 0;
	left: 0;
	position: absolute;
`


export default TodoCreate;