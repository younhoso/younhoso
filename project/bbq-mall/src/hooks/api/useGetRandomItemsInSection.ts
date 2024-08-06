import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { PLATFORMLIST, VERSION1_1 } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { SectionDetail, SectionList } from '@/types';
import { generateRandom } from '@/utils/generateRandom';

export const useGetRandomItemsInSections = () => {
  const { data: list } = useQuery({
    queryKey: ['/display/sections'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<{ sections: SectionList[] }>(key),
  });

  const randomCategoryNumber = useMemo(() => {
    if (!list) return undefined;

    list.data.sections = list.data.sections.filter(v => v.sectionId.includes('SCPC'));

    const { length } = list.data.sections;

    if (!length) return undefined;

    const randomNumber = generateRandom(0, length - 1);

    return list.data.sections[randomNumber].sectionNo;
  }, [list]);

  const { data, refetch } = useQuery({
    queryKey: [`/display/sections/${randomCategoryNumber}`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC, VERSION1_1).get<SectionDetail>(key, {
        params: {
          by: 'ADMIN_SETTING',
          pageNumber: 1,
          pageSize: 5,
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    if (randomCategoryNumber) {
      refetch();
    }
  }, [randomCategoryNumber]);

  return { data };
};
