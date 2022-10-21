import React from 'react';
import styled from 'styled-components';
import useInputs from '../hooks/useInputs';

const INITIAL_VALUES = {
  todo: '',
	isCompleted: false,
	userId: 0,
};


const TodoForm = ({
	initialValues = INITIAL_VALUES, 
	onCancel,
	onCreate,
	setOpen,
	setItems,
	onUpdateSuccess}) => {
	// input의 커스텀훅
	const [values, setValues] = useInputs(initialValues);
	const data = {
		todo: values.todo,
		isCompleted: values.isCompleted,
		userId: values.userId,
	};

	const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(name, value);
  };
	
	const onSubmit = async (e) => {
		e.preventDefault();
		let result;
		try{
			// eslint-disable-next-line no-unused-vars
			result = await onCreate(data);
		} catch (error) {
			console.log(error)
			return;
		}

		setValues(INITIAL_VALUES);
		/*
			values.id 수정 모드일때 고유한 id값 있고,
			생성 모드일때 고유한 id값 없습.
		*/
		values.id && onUpdateSuccess(result.data);
		!values.id && setOpen(); //생성모드일때 모두 입력 작성 끝나고 초기화.
		!values.id && setItems((prev) => [ //생성모드일때 기존 값에 새로운 값 추가함.
			...prev,
			result.data
		]);
	}

	return (
		<InsertForm onSubmit={onSubmit}>
			<Input type="text" name="todo" onChange={handleInputChange} defaultValue={values.todo} placeholder='할 일을 입력 해주세요.' autoFocus/>
			{!values.id && <Button>추가</Button>}
			{values.id && <button>수정</button>}
			{onCancel && <button onClick={onCancel}>취소</button>}
		</InsertForm>
	);
};


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
export default TodoForm;