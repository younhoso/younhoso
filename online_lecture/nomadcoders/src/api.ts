const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins() {
	const response = await fetch(`${BASE_URL}/coins`);
	if(!response.ok){
		throw new Error('데이터 불러오는데 실패했습니다.')
	}
	const body = await response.json();
	return body;
}

export async function fetchCoinInfo(coinId: string) {
	const response = await fetch(`${BASE_URL}/coins/${coinId}`);
	if(!response.ok){
		throw new Error('데이터 불러오는데 실패했습니다.')
	}
	const body = await response.json();
	return body;
}

export async function fetchCoinTickers(coinId: string) {
	const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
	if(!response.ok){
		throw new Error('데이터 불러오는데 실패했습니다.')
	}
	const body = await response.json();
	return body;
}