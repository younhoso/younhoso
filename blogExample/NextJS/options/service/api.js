const BASE_URL = './dummyData.json';

export async function getData() {;
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다');
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
  }
}