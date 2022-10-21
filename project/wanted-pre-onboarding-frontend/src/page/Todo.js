import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoCreate from "../components/TodoCreate";
import TodoForm from "../components/TodoForm";
import TodoHead from "../components/TodoHead";
import TodoItem from "../components/TodoItem";
import TodoTemplate from "../components/TodoTemplate";
import { apis } from "../store/api";

const Todo = ({items, setItems, editingId, setEditingId}) => {
	const navigate = useNavigate();
	const undoneTasks = items.filter(todo => !todo.isCompleted);// 할 일 남음 객수를 알림 

	const handleCancel = () => setEditingId(null);

	const handleUpdateSuccess = (todo) => {
		setItems((prev) => {
			const splitIdx = prev.findIndex((item) => item.id === todo.id);
			return [
				...prev.slice(0, splitIdx),
				todo,
				...prev.slice(splitIdx + 1),
			]
		})
	};

	useEffect(() => {
		if(!localStorage.getItem('accessToken')){
			navigate('/')
		}
	},[]);
	
	return (
		<>
			<TodoTemplate>
				<TodoHead length={undoneTasks.length}/>
				<TodoListBlock>
					{items.map( item => {
						const {id, todo, isCompleted} = item;
						const initialValues = {id, todo, isCompleted};
							if( item.id === editingId ){
								const handleSubmit = (data) => apis.updateTodo(id, data);

								const handleSubmitSuccess = (todoRe) => {
									handleUpdateSuccess(todoRe);
									setEditingId(null);
								}
								return ( 
									<TodoForm
										key={id}
										initialValues={initialValues}
										onCancel={handleCancel}
										setItems={setItems}
										onCreate={handleSubmit}
										onUpdateSuccess={handleSubmitSuccess} 
									/>
								)
							}
							return ( 
								<TodoItem
									key={id}
									id={id}
									text={todo}
									done={isCompleted}
									onEdit={setEditingId}
									setItems={setItems}
								/>
							)
						}
					)}
					<TodoCreate 
						onCreate={apis.createTodo} 
						setItems={setItems}
					/>
				</TodoListBlock>
			</TodoTemplate>
		</>
	)
};

const TodoListBlock = styled.ul`
	flex: 1;
	padding: 20px 32px;
	padding-bottom: 48px;
	overflow-y: auto;
`

export default Todo;