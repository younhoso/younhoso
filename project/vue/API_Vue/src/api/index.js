import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_SERVER
});

api.interceptors.response.use((config) => {
  config.headers['Content-type'] = 'application/json; charset=UTF-8';
  return config
}, (err) => {
  return Promise.reject(err.response);
});

export default api;