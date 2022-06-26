import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5001",
	headers: {
		'Content-type': 'application/json; charset=UTF-8',
		accept: 'application/json,',
	}
});

export const apis = {
	// post
	get: () => api.get('/posts'),
	update: (data) => api.post('/posts', data)
}
