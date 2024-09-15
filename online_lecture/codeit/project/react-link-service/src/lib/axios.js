import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://learn.codeit.kr/api/link-service',
  withCredentials: true,
});

export default instance;
