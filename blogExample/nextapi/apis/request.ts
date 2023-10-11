import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

type oauthType = {
  memberId: string,
  password: string
}

const api = axios.create();

// 토큰 실어보내는 request interceptor
api.interceptors.request.use(async (config) => {
  config.headers['Content-type'] = 'application/json; charset=UTF-8';
	config.headers['Accept'] = 'application/json;';
	if(localStorage.getItem('accessToken')){
		config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
	}else{
		if(window.location.pathname !== '/login') window.location.href= "/login";
	}
	return config;
},(err) => {
	return Promise.reject(err);
});

// Access 토큰 만료됐을 경우 Refresh 토큰으로 재요청 보내는 interceptor 추가된 응답 api
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) { // 권한없음 === Access 토큰 만료됐을 경우
      if(localStorage.getItem('kakaoToken')){
				window.location.href = '/login';
			}else if(localStorage.getItem('accessToken')){
				if(!cookies.get('refreshToken')){
					window.location.href = '/login';
				}else{
					const originalRequest = config;
					const refreshToken = await cookies.get('refreshToken');
					// token refresh 요청
					const { data } = await api.post('/api/refresh', {refreshToken});

					// 새로운 토큰 저장
					const {
						accessToken: newAccessToken,
					} = data;
					
					localStorage.setItem('accessToken', newAccessToken)
					api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					// 401로 요청 실패했던 요청을 새로운 accessToken으로 재요청
					return axios(originalRequest);
				}
			}else{
				window.location.href = '/login';
			}
    }
    return Promise.reject(error);
  }
);


const publicApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER,
  headers: {
    Version: '1.0',
    clientId: process.env.NEXT_PUBLIC_CLIENTID,
    platform: 'PC'
  }
});

export const apis = {
  postOauth: (params: oauthType) => publicApi.post('oauth/token', params)
};