import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8000"
});

api.interceptors.request.use((config) => {
	config.headers['Content-Type'] = 'application/json; charset=utf-8';
	config.headers['Accept'] = 'application/json';
	if(localStorage.getItem('accessToKen')){
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
	}
	return config;
}, (err) => {
	return Promise.reject(err);
});

export const apis = {
	signUp: (data) => api.post('/auth/signup', data),
	signIn: (data) => api.post('/auth/signin', data),
};