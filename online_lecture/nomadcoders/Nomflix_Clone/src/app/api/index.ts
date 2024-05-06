const BASE_URL = process.env.BASE_URL!;
const API_KEY_TOKEN = process.env.API_KEY_TOKEN!;

const infoApi = {
  creatHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    headers['Authorization'] = `Bearer ${API_KEY_TOKEN}`;
    return headers;
  },
};

export async function createFetchAPI(path: string = '', data: Record<string, any> = {}) {
  try {
    const result = await fetch(`${BASE_URL}/${path}`, {
      method: 'POST',
      headers: infoApi.creatHeaders(),
      body: JSON.stringify(data),
    });

    const body = await result.json();
    if (body.data && body.data.status === 401) {
      throw new Error('데이터를 생성하는데 권한이 없습니다.');
    }
    return body;
  } catch (error) {
    // 네트워크 오류 혹은 json 변환 오류등
    throw new Error('API 요청 처리 중 문제가 발생했습니다.');
  }
}

export async function getFetchAPI(path: string = '') {
  try {
    const result = await fetch(`${BASE_URL}/${path}`, {
      method: 'GET',
      headers: infoApi.creatHeaders(),
    });

    const body = await result.json();
    if (body.data && body.data.status === 401) {
      throw new Error('데이터를 가져올 권한이 없습니다.');
    }
    return body;
  } catch (error) {
    // 네트워크 오류 혹은 json 변환 오류등
    throw new Error('API 요청 처리 중 문제가 발생했습니다.');
  }
}

export async function updateFetchAPI(
  path: string = '',
  id: string = '',
  data: Record<string, any> = {},
) {
  const headers = infoApi.creatHeaders();

  const response = await fetch(`${BASE_URL}/${path}/${id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
  if (!response.ok) {
    throw new Error('데이터를 수정하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}

export async function deleteFetchAPI(path: string = '', id: string = '') {
  const headers = infoApi.creatHeaders();

  const response = await fetch(`${BASE_URL}/${path}/${id}`, {
    headers,
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('데이터를 삭제하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}
