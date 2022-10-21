import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Redirect } from './components/Redirect';
// page
import Auth from './page/Auth';
import Todo from './page/Todo';

const Router = ({items, setItems, editingId, setEditingId, undoneTasks}) => {
	const navigate = useNavigate();
	useEffect(() => {
		if(localStorage.getItem('accessToken')){
			navigate('/wanted-pre-onboarding-frontend/todo');
		} else if(!localStorage.getItem('accessToken') && window.location.pathname === '/wanted-pre-onboarding-frontend'){
			navigate('/wanted-pre-onboarding-frontend/');
		}
	},[navigate]);

	return (
		<Routes>
			<Route path="/wanted-pre-onboarding-frontend/" element={<Auth/>}/>
			<Route path="/wanted-pre-onboarding-frontend/:auth" element={<Auth/>} />
			<Route path="/wanted-pre-onboarding-frontend/todo" element={<Todo items={items} setItems={setItems} editingId={editingId} setEditingId={setEditingId} undoneTasks={undoneTasks}/>} />
			<Route path="*" element={<Redirect />} />
		</Routes>
	)
}

export default Router;