const apiFetchHandler = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        const body = await response.json();
        return body;
    } catch (e) {
        console.log(e);
    }
};

export const api = {
    getProductData: () => apiFetchHandler('./productData.json'),
};
