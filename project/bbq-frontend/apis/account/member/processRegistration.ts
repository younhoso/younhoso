import axios from '@/axios';

type Params = {
  username: string;
  password: string;
  email?: string;
  phoneVerificationKey: string;
  birth?: string;
  gender?: string;
  registrationKey?: string;
};

type Response = {
  memberId: string;
  name: string;
  email: string;
  phoneNumber: string;
  birth: string;
  marketingAgreementToken: string;
};

export const processRegistration = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/register/process`, {
    ...params,
  });

  return data;
};
