import axios from "axios";

export const api = axios.create({
	baseURL : 'https://openapi.naver.com'
});

api.interceptors.request.use((config) => {
	config.headers = {
		'Content-Type': 'application/json; charset=UTF-8',
		'X-Naver-Client-Id': 'dPjwaA1B5WfiXZdk0s3T',
		'X-Naver-Client-Secret': '4wHGr8GLFg'
	}
	return config;
},(err) => {
	return Promise.reject(err);
});

export const apis = {
	datas: (data: String) => api.post('/v1/datalab/shopping/category/keyword/age', data)
}