import axios from '@/axios';
import { Grade } from '@/types';

export const getGrade = async (): Promise<Grade> => {
  const { data } = await axios.get(`/api/account/membership/grade/my`);

  return data;
};
