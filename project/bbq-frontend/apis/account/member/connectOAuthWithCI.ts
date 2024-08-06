import axios from '@/axios';

export type Params = {
  registrationKey: string;
  username: string;
  ciToken: string;
};

export type Response = void;

export const connectOAuthWithCI = async (params: Params): Promise<Response> => {
  await axios.post(`/api/account/member/register/connect-oauth-ci`, {
    ...params,
  });
};
