import {getAllProducts} from './catSlice.js';

export const getProducts = ({order = '', offset = '', limit = 10}) => {
	return async (dispatch, getState) => {
		const query = `order=${order}&offset=${offset}&limit=${limit}`;
		const url = `https://learn.codeit.kr/api/film-reviews?${query}`
		const response = await fetch(url);
		if(!response.ok){
			throw new Error('데이터 불러오는데 실했습니다.')
		}
		const data = await response.json();
		dispatch(getAllProducts({data}));
	};
};