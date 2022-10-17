import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoCreate from "../components/TodoCreate";
import TodoItem from "../components/TodoItem";
import TodoTemplate from "../components/TodoTemplate";
import { apis } from "../store/api";

const Todo = () => {
	const [items, setItems] = useState([]);
	const handleLoad = async () => {
		const {data} = await apis.getTodos();
		setItems(data);
	};

	useEffect(() => {
		handleLoad();
	},[])
	
	return (
		<>
			<TodoTemplate>
				<TodoListBlock>
					{items.map(
						todo => <TodoItem key={todo.id} id={todo.id} text={todo.todo} done={todo.isCompleted} setItems={setItems}/>
					)}
					<TodoCreate setItems={setItems}/>
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