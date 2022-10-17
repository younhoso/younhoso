import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import {MdAdd} from 'react-icons/md';
import useInputs from '../hooks/useInputs';
import { apis } from "../store/api";

const INITIAL_VALUES = {
  todoText: ""
};

const TodoCreate = ({setItems}) => {
	// input의 커스텀훅
	const [open, setOpen] = useState(false);
	const [values, onChange] = useInputs(INITIAL_VALUES);

	const onToggle = () => setOpen(!open);
	const onChanged = (e) => {
		const {name, value} = e.target;
		onChange(name, value)
	}
	const data = {
			todo: values.todoText,
			isCompleted: false,
			userId: 1,
	};
	
	const onSubmit = async (e) => {
		e.preventDefault();
		let result;
		try{
			// eslint-disable-next-line no-unused-vars
			result = await apis.createTodo(data);
		} catch (error) {
			console.log(error)
			return;
		}

		setItems((prev) => [
			...prev,
			result.data
		]);

		onChange('todoText', '');
		setOpen(false);
		// data.userId += 1;
	}

	return (
		<>
		{open && (
			<InsertFormPositioner>
				<InsertForm onSubmit={onSubmit}>
					<Input type="text" name="todoText" value={values.todoText} onChange={onChanged} placeholder='할 일을 입력 해주세요.' autoFocus/>
					<Button>추가</Button>
				</InsertForm>
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

const InsertForm = styled.form`
	background-color:  #f8f9fa;
	padding: 32px;
	padding-bottom: 72px;
	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
`

const Input = styled.input`
	padding: 12px;
	border-radius: 4px;
	border: 1px solid #dee2ed;
	width: 90%;
	outline: none;
	font-size: 18px;
	box-sizing: border-box;
`

const Button = styled.button`
	background-color: transparent;
	border: 1px solid #333;
	height: 47px;
	cursor: pointer;
`

export default TodoCreate;