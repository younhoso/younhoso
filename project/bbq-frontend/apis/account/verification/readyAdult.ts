import axios from '@/axios';

type Params = {
  isMobile?: boolean;
};

type Response = string;

export const readyAdult = async ({ isMobile }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/pay/adult/ready`, {
    headers: {
      'x-agent': isMobile ? 'MOBILEWEB' : 'DESKTOPWEB',
    },
  });

  return data;
};
