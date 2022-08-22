import axios from "axios";

export const api = axios.create({
	baseURL : process.env.REACT_APP_SERVER
});

export const apis = {
	datas: (data: String) => api.post('v1/datalab/shopping/category/keyword/age', data)
}