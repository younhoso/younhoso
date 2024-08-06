import strapiAxios, { useAction, useGet, API_HOST } from './index';
import { UseGetOptions } from './index';

// 소셜 로그인
export const useProviderSignIn = () => {
  return useAction(async (provider, access_token) => {
    const res = await strapiAxios.get(`${API_HOST}/auth/${provider}/callback`, {
      params: {
        access_token,
      },
    });

    return res.data;
  });
};

// 로그인
export const useSignIn = () => {
  return useAction(async (identifier, password) => {
    const res = await strapiAxios.post(`${API_HOST}/auth/local`, {
      identifier,
      password,
    });

    return res.data;
  });
};

// 회원가입
export const useSignUp = () => {
  return useAction(async data => {
    const res = await strapiAxios.post(`${API_HOST}/auth/local/register`, data);

    return res.data;
  });
};

// 로그인 한 회원정보 가져오기
export const useGetMe = (options?: UseGetOptions) => {
  return useGet('/users/me', options);
};

export const getMe = async (context: any) => {
  if (context.req.cookies.token) {
    const user = await strapiAxios('/users/me', {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    });

    return user.data;
  } else {
    return null;
  }
};
