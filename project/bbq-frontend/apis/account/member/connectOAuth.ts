import axios from '@/axios';

export type Params = {
  registrationKey: string;
  username: string;
  phoneVerificationKey: string;
};

export type Response = void;

export const connectOAuth = async (params: Params): Promise<Response> => {
  await axios.post(`/api/account/member/register/connect-oauth`, {
    ...params,
  });
};
