import strapiAxios from '~/apis';

export const sendEmail = async (query: any) => {
  const queryString = Object.entries(query)
    .map(([key, value], i) =>
      i === 0 ? `?${key}=${value}` : `&${key}=${value}`,
    )
    .join('');
  strapiAxios.get(`/api/mail${queryString}`);
};
