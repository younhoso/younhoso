import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { PLATFORMLIST, VERSION1_1 } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { SectionDetail, SectionList } from '@/types';
import { generateRandom } from '@/utils/generateRandom';

export const useGetRandomProductNo = () => {
  const { data } = useQuery({
    queryKey: ['/add/cart'],
    queryFn: async () => {
      const list = await customAxios(PLATFORMLIST.PC).get<{ sections: SectionList[] }>(
        '/display/sections',
      );
      if (!list) return undefined;

      const { length } = list.data.sections;

      if (!length) return undefined;

      const randomNumber = generateRandom(0, length - 1);

      const randomCategoryNumber = list.data.sections[randomNumber].sectionNo;

      const data = await customAxios(PLATFORMLIST.PC, VERSION1_1).get<SectionDetail>(
        `/display/sections/${randomCategoryNumber}`,
        {
          params: {
            by: 'ADMIN_SETTING',
            pageNumber: 1,
            pageSize: 4,
          },
        },
      );

      const item = data.data.products.length ? data.data.products[0].productNo : undefined;
      return item;
    },
  });

  return data;
};
