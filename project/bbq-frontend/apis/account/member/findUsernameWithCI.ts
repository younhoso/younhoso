import axios from '@/axios';
import { FindAccountMemberUsernameAPIResponse } from '@/types';

type Request = {
  ciToken: string;
};

export const findUsernameWithCI = async (
  params: Request,
): Promise<FindAccountMemberUsernameAPIResponse> => {
  const { data } = await axios.post(`/api/account/member/find/username-ci`, {
    ...params,
  });

  return data;
};
