import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// page
import Login from './page/Login';
import Signup from './page/Signup';
import Todo from './page/Todo';

const Router = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if(!localStorage.getItem('accessToken')){
			navigate('/');
		} else {
			navigate('/todo');
		}
	},[navigate])

	return (
		<Routes>
			<Route path='/' element={<Login />} exact/>
			<Route path='/signup' element={<Signup/>} />
			<Route path='/todo' element={<Todo/>} />
			<Route path='*' element={<Login replace to='/' />} />
		</Routes>
	)
}

export default Router;