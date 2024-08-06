import axios from '@/axios';

type Response = {
  currentPoint: number; // 520
  expireExpectedPoint: number; // 70
  expireScheduleDate: string; // "2023-09-25"
};

export const getStatus = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/account/point/status`);

  return data;
};
