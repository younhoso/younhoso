import strapiAxios from '.';

import qs from 'qs';

export const selectOptionConvert = (selectOptions: any) => {
  const places = selectOptions
    .filter((v: any) => v.category === 'place')
    .map((v: any) => ({
      value: v.id,
      label: v.label,
    }));

  const ecosystems = selectOptions
    .filter((v: any) => v.category === 'ecosystem')
    .map((v: any) => ({ value: v.id, label: v.label }));

  const extremes = selectOptions
    .filter((v: any) => v.category === 'extreme')
    .map((v: any) => ({ value: v.id, label: v.label }));

  const collectings = selectOptions
    .filter((v: any) => v.category === 'collecting')
    .map((v: any) => ({ value: v.id, label: v.label }));

  return [
    {
      name: 'place',
      type: 'button',
      options: places,
    },
    {
      name: 'ecosystem',
      type: 'select',
      options: ecosystems,
    },
    {
      name: 'extreme',
      type: 'select',
      options: extremes,
    },
    {
      name: 'collecting',
      type: 'select',
      options: collectings,
    },
  ];
};

export const getDivePointSearchCategory = async () => {
  const query = qs.stringify({
    _where: {
      _or: [
        { category: 'collecting' },
        { category: 'extreme' },
        { category: 'place' },
        { category: 'ecosystem' },
      ],
    },
  });
  const { data: selectOptions } = await strapiAxios.get(
    `/select-options?${query}`,
  );

  return selectOptionConvert(selectOptions);
};
