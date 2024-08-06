import axios from '@/axios';

type Params = {
  oldPassword: string;
  newPassword: string;
};

type Response = void;

export const modifyPassword = async (params: Params): Promise<Response> => {
  await axios.put(`/api/account/member/info/password`, {
    ...params,
  });
};
