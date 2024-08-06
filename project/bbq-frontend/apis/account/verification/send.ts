import axios from '@/axios';

type Params = {
  name: string;
  phoneNumber: string;
};

type Response = {
  username: string;
  createdAt: string;
  expiresAt: string;
};

export const send = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/phone-verification/create`, {
    ...params,
  });

  return data;
};
