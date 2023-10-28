import baseAxios from 'axios';

const axios = baseAxios.create({
  baseURL: '/api/',
});

export default axios;
