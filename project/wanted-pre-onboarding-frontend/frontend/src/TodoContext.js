import React, {createContext, useContext, useReducer, useRef} from "react";
import { apis } from "./store/api";

const initalTodos = [
	{
		id: 1,
		text: '프로젝트 생성하기',
		done: true
	},
	{
		id: 2,
		text: '컴포넌트 스타일링하기',
		done: true
	},
	{
		id: 3,
		text: 'Context 만들기',
		done: false
	},
	{
		id: 4,
		text: '기능 구현하기',
		done: false
	}
];

function todoReducer(state, action){
	switch (action.type){
		case 'CREATE':
			return state.concat(action.todo);
		case 'TOGGLE':
			return state.map(
				todo => todo.id === action.id ? {...todo, done: !todo.done} : todo
			)
		case 'REMOVE':
			return state.filter(todo => todo.id !== action.id)
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
};

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){
	const [state, dispatch] = useReducer(todoReducer, initalTodos);
	const nextId = useRef(5);
	
	return (
		<TodoStateContext.Provider value={state}>
			<TodoDispatchContext.Provider value={dispatch}>
				<TodoNextIdContext.Provider value={nextId}>
					{children}
				</TodoNextIdContext.Provider>
			</TodoDispatchContext.Provider>
		</TodoStateContext.Provider>
	)
};
// state를 위한 커스텀 hook
export function useTodoState() {
	const context = useContext(TodoStateContext);
	if(!context){
		throw new Error('Cannot find TodoProvider');
	}
	return context;
};

// dispatch를 위한 커스텀 hook 
export function useTodoDispatch() {
	const context = useContext(TodoDispatchContext);
	if(!context){
		throw new Error('Cannot find TodoProvider');
	}
	return context;
};

// NextId를 위한 커스텀 hook 
export function useTodoNextId() {
	const context = useContext(TodoNextIdContext);
	if(!context){
		throw new Error('Cannot find TodoProvider');
	}
	return context;
};

export async function getTodos(type, dispatch) {
	dispatch({type});
	try {
		const response = await apis.createTodo()
		dispatch({
			type,
			response
		})
	} catch(e){
		dispatch({ type, error: e });
	}
};
