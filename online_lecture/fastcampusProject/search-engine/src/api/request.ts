import { IParamObj } from 'types';

const apiFetchHandler = async (url: string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        const body = await response.json();
        console.log(body);
        return body;
    } catch (e) {
        console.log(e);
    }
};

const BASE_URL = 'https://pixabay.com/api';

const defaultParam = {
    key: process.env.REACT_APP_PIXABAY || '',
};

export const api = {
    getProductData: (paramObj: IParamObj) => {
        const params = new URLSearchParams({
            ...defaultParam,
            ...paramObj,
        }).toString();

        return apiFetchHandler(`${BASE_URL}/?${params}`);
    },
};
