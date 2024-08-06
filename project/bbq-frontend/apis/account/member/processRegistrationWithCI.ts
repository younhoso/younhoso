import axios from '@/axios';

type Request = {
  username: string;
  password: string;
  email?: string;
  ciToken: string;
  registrationKey?: string;
  isSocial: boolean;
  isApple: boolean;
};

type Response = {
  memberId: string;
  name: string;
  email: string;
  phoneNumber: string;
  birth: string;
  marketingAgreementToken: string;
  accessToken: string;
  refreshTokenInfo: {
    refreshTokenString: string;
    expiresAt: string;
  };
};

export const processRegistrationWithCI = async (params: Request): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/register/process-ci`, {
    ...params,
  });

  return data;
};
