import axios from '@/axios';

export const getToken = async (): Promise<string> => {
  const { data } = await axios.get(`/api/delivery/pay/adult/token`);

  return data.token;
};
