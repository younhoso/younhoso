import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER
});

api.interceptors.request.use((config) => {
	config.headers['Content-Type'] = 'application/json; charset=utf-8';
	config.headers['Accept'] = 'application/json';
	if(localStorage.getItem('accessToken')){
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
	}
	return config;
}, (err) => {
	return Promise.reject(err);
});

export const apis = {
	signUp: (data) => api.post('/auth/signup', data),
	signIn: (data) => api.post('/auth/signin', data),
	createTodo: (data) => api.post('/todos', data),
	getTodos: () => api.get('/todos'),
	updateTodo: (id, data) => api.put(`/todos/${id}`, data),
	deleteTodo: (id) => api.delete(`/todos/${id}`)
};