import axios from '@/axios';

type Params = {
  name: string;
  phoneNumber: string;
  authCode: string;
};

type Response = {
  message: string;
};

export const confirm = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/phone-verification/confirm`, {
    ...params,
  });

  return data;
};
