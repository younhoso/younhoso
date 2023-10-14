import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://learn.codeit.kr/api/codeitmall',
});

export const apis = {
  getProducts : () => instance.get('/products'),
  getProductsId : (id) => instance.get(`/products/${id}`),
  getProductsSearch : (query) => instance.get(`/products/?q=${query}`),
  reviews: (id) => instance.get(`/size_reviews/?product_id=${id}`)
};
