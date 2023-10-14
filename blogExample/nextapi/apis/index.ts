const BASE_URL = "http://localhost:8000";

export async function getData() {
  const res = await fetch(`${BASE_URL}/posts/`)

  if(!res.ok){
    throw new Error('데이터 가져오는데 실패했습니다.');
  }

  const body = await res.json();
  return body;
};

export async function createData(data: any) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!res.ok) {
    throw new Error('데이터 생성하는데 실패했습니다.');
  }
  const body = await res.json();
  return body;
};

export async function updateData(id:any, data:any) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('데이터 수정하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
};

export async function deleteData(id:any) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('데이터 삭제하는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}
