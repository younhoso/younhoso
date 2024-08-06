import dayjs from 'dayjs';

export const calculateDayDiff = (date: string | Date) => {
  return dayjs(new Date(date)).diff(new Date(), 'day');
};
