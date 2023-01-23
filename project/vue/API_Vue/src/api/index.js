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

export const apis = {
  //search get
  search: (options) => api.get(`/search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&${options}`),
  getmovie: () => api.get(`/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=ko-KR&page=1`),
}