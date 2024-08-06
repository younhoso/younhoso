import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import { Platform, customAxios } from '@/libs/customAxios';
import { BoardConfig, InquiryCategory } from '@/types';

import { handleBulk } from '../useHandleWebview';

export type InquiryListType = BoardConfig | { name: string; onClick: () => void; boardNo?: number };
export const INQUIRY_NUMBER = -1;

export const useGetInquiryList = (platform: Platform): InquiryListType[] => {
  const router = useRouter();

  const { data: board } = useQuery({
    queryKey: ['/boards/configurations'],
    queryFn: ({ queryKey: [key] }) => customAxios(platform).get<InquiryCategory>(key),
  });

  const inquiryCategory = board?.data.boardConfigs
    .filter(v => v.name !== '당첨자 발표')
    .sort((a, b) => a.boardNo - b.boardNo);

  const defaultInquiry = [
    {
      name: '1:1 문의',
      onClick: () => router.push('/inquiry'),
      boardNo: INQUIRY_NUMBER,
    },
    {
      name: '대량구매 문의',
      onClick: () => handleBulk(),
    },
  ];

  return [...(inquiryCategory ?? []), ...defaultInquiry];
};
