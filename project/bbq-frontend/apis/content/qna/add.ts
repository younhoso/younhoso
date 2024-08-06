import axios from '@/axios';

type Response = {
  id: number;
  memberId: string;
  memberType: string;
  name: string;
  phoneNumber: string;
  title: string;
  content: string;
  branchId?: string;
  familyName: string;
  familyAddress: string;
  familyTel: string;
  createdAt: string;
};

export const add = async (form: any): Promise<Response> => {
  const { data } = await axios.post(`/api/post-delivery-content-qna`, form);

  return data;
};
