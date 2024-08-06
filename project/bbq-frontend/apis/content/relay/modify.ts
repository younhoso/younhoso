import axios from '@/axios';

type Response = {
  id: string;
  memberId: string;
  memberType: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  title: string;
  content: string;
  createdAt: string;
};

export const modify = async (form: any): Promise<Response> => {
  const { data } = await axios.patch(`/api/proxy-content-relay`, form);

  return data;
};
