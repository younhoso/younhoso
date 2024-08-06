import axios from '@/axios';

type Params = {
  newPhoneNumber: string;
  authCode: string;
};

type Response = void;

export const modifyPhoneNumber = async (params: Params): Promise<Response> => {
  await axios.put(`/api/account/member/info/phone`, {
    ...params,
  });
};
