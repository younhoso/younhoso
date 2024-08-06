import axios from '@/axios';
import { FindAccountMemberUsernameAPIParams, FindAccountMemberUsernameAPIResponse } from '@/types';

export const findUsername = async (
  params: FindAccountMemberUsernameAPIParams,
): Promise<FindAccountMemberUsernameAPIResponse> => {
  const { data } = await axios.post(`/api/account/member/find/username`, {
    ...params,
  });

  return data;
};
