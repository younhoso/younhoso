import axios from '@/axios';

type Params = {
  token: string;
};

export const goReady = async ({ token }: Params): Promise<true> => {
  const { data } = await axios.post(`/delivery/pay/adult/ready`);

  return true;
};
