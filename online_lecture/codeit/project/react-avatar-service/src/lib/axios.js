import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://learn.codeit.kr/api/avatar-service',
  withCredentials: true,
});

export default instance;
