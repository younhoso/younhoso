import axios from '@/axios';

type Params = {
  phoneNumber: string;
  authCode: string;
};

type Response = {
  phoneNumber: string;
};

export const confirmGuest = async (params: Params): Promise<Response> => {
  const { data } = await axios.put(`/api/account/guest/info/phone`, {
    ...params,
  });

  return data;
};
