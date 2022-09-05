import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

// 액션 타입
// 포스트 여러개 조회하기
const GET_POSTS = 'posts/GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_ERROR = 'post/GET_POST_ERROR';

// thunk 함수
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

const initialState = {
  posts: reducerUtils.inital(),
  post: reducerUtils.inital()
};

export default function posts(state = initialState, action) {
	switch(action.type) {
		case GET_POSTS:
		case GET_POSTS_SUCCESS:
		case GET_POSTS_ERROR:
			return handleAsyncActions(GET_POSTS, 'posts')(state, action);
		case GET_POST:
		case GET_POST_SUCCESS:
		case GET_POST_ERROR:
			return handleAsyncActions(GET_POST, 'post')(state, action);
		default:
			return state;
	}
}