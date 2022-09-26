const BASE_URL = `https://api.coinpaprika.com/v1`
const BASE_URL2 = `https://ohlcv-api.nomadcoders.workers.dev`

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

export async function fetchCoinHistory(coinId: string){
	const endDate = Math.floor(Date.now() / 1000); // 현재 시간을 초로 나타냄
	const startDate = endDate - 60 * 60 * 24 * 7 * 1; // 일주일전을 초로 나타냄
	const response = await fetch(`${BASE_URL2}?coinId=${coinId}&start=${startDate}&end=${endDate}`)
	const body = await response.json();
	return body;
};