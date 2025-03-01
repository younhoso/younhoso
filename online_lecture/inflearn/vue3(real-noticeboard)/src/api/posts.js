import { posts } from '.';

export function getPosts(params) {
  return posts.get('/', { params });
}

export function getPostsById(id) {
  return posts.get(`/${id}`);
}

export function createPost(data) {
  return posts.post('', data);
}

// put(전체 업데이트)과, patch(부분 업데이트) 용도가 다르다.
// export function updatePost(id, data) {
//   return posts.put(`/${id}`, data);
// }

export function updatePost(id, data) {
  return posts.patch(`/${id}`, data);
}

export function deletePost(id) {
  return posts.delete(`/${id}`);
}
