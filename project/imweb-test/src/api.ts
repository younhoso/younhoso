import axios, {AxiosRequestConfig} from "axios";

export const api = axios.create({
	baseURL: './mock.json'
});

api.interceptors.request.use((config: AxiosRequestConfig) : AxiosRequestConfig => {
	config.headers = {
		'Content-Type': 'application/json; charset=utf-8',
		'Accept': 'application/json',
	}
	if(localStorage.getItem('accessToken')){
		config.headers = {
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
		}
	}
	return config;
}, (err) => {
	return Promise.reject(err);
});

export const apis = {
	getItem: () => api.get('/restful/v2/sample.cm?resource=shop/products/')
}