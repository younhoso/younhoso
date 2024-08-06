interface DateFromPastType {
  type: string;
  value: number;
}

export const getDateFromPast = ({ type, value }: DateFromPastType) => {
  const date = new Date();

  if (type == 'all') {
    return {
      from: new Date(+0),
      to: date,
    };
  } else if (type == 'y') {
    date.setFullYear(date.getFullYear() - value);
  } else if (type == 'm') {
    date.setMonth(date.getMonth() - value);
  } else if (type == 'w') {
    date.setDate(date.getDate() - value * 7);
  } else if (type == 'd') {
    date.setDate(date.getDate() - value);
  }

  return {
    from: date,
    to: new Date(),
  };
};
