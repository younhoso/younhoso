import axios from 'axios';
import { initData } from './types';
const BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers : {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*'
  }
});

export const apis = {
  postShoppingData: (data: initData) => api.post('/', data),
}