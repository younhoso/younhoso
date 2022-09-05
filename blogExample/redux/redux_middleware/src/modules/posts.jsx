import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { reducerUtils } from '../lib/asyncUtils';

// 액션 타입
// 포스트 여러개 조회하기
const GET_POSTS = 'posts/GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_ERROR = 'posts/GET_POST_ERROR';

// thunk 를 사용 할 때, 꼭 모든 액션들에 대하여 액션 생성함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어주어도 괜찮습니다.
export const getPosts = () => async (dispath) => {
	// 요청이 시작됨
	dispath({type: GET_POSTS});
	// API를 호출
	try {
		const posts = await postsAPI.getPosts();
		// 성공했을때 액션
		dispath({
			type: GET_POSTS_SUCCESS,
			posts
		})
	} catch (e) {
		// 실패했을때 액션
		dispath({
			type: GET_POSTS_ERROR,
			error: e
		})
	}
};

export const getPost = (id) => async (dispath) => {
	// 요청이 시작됨
	dispath({type: GET_POST});
	// API를 호출
	try {
		const post = await postsAPI.getPostById(id);
		// 성공했을때 액션
		dispath({
			type: GET_POST_SUCCESS,
			post
		})
	} catch (e) {
		// 실패했을때 액션
		dispath({
			type: GET_POST_ERROR,
			error: e
		})
	}
};

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
};

export default function posts(state = initialState, action) {
	switch(action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: reducerUtils.loading()
			}
		case GET_POSTS_SUCCESS:
			return {
				...state,
				posts: reducerUtils.success(action.post)
			}
		case GET_POSTS_ERROR:
			return {
				...state,
				posts: reducerUtils.error(action.error)
			}
		case GET_POST:
			return {
				...state,
				post: reducerUtils.loading()
			};
		case GET_POST_SUCCESS:
			return {
				...state,
				post: reducerUtils.success(action.post)
			};
		case GET_POST_ERROR:
			return {
				...state,
				post: reducerUtils.error(action.error)
			};
		default:
			return state;
	}
}