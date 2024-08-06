import axios from '@/axios';

type Response = {
  currentPoint: number;
};

export const get = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/point/hpc/info`);

  return data;
};
