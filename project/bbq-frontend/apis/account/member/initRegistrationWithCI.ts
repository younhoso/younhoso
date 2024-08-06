import axios from '@/axios';

type Params = {
  ciToken: string;
};

type Response = {
  isRegistered: boolean;
  username?: string;
  name?: string;
  phoneNumber?: string;
  birth?: string;
  gender?: string;
};

export const initRegistrationWithCI = async ({ ciToken }: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/register/init-ci`, {
    ciToken,
  });

  return data;
};
