import axios from '@/axios';

type Params = {
  name: string;
  phoneNumber: string;
  authCode: string;
  registrationKey?: string;
};

type Response = {
  isRegistered: boolean;
  username?: string;
  phoneVerificationKey: string;
};

export const initRegistration = async ({
  name,
  phoneNumber,
  authCode,
  registrationKey,
}: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/register/init`, {
    name: name,
    phoneNumber: phoneNumber,
    authCode: authCode,
    registrationKey: registrationKey,
  });

  return data;
};
