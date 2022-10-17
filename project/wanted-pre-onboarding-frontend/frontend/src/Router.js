import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// page
import Login from './page/Login';
import Signup from './page/Signup';
import Todo from './page/Todo';

const Router = () => {
	const navigate = useNavigate();
	useEffect(() => {
		if(localStorage.getItem('accessToken')){
			navigate('/todo');
		} else if(!localStorage.getItem('accessToken') && window.location.pathname !== '/'){
			navigate('/signup');
		}
	},[navigate])

	return (
		<Routes>
			<Route path='/' element={<Login />} exact/>
			<Route path='/signup' element={<Signup/>} />
			<Route path='/todo' element={<Todo/>} />
		</Routes>
	)
}

export default Router;