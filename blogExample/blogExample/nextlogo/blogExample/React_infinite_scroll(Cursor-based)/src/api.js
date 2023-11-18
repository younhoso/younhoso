export async function getFoods({ order = '', cursor = '', limit = 10 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/api/foods?${query}`);
  const body = await response.json();
  return body;
}
