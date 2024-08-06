'use client';

import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import PageTitle from '@/components/PageTitle';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcHelpDetailPageStyled } from '@/styles/pageStyled/pc/pcHelpDetailPageStyled';
import { BoardItems, InquiryCategory } from '@/types';

const PcHelpDetail = ({
  params: { articleNo, categoryNo },
}: {
  params: { articleNo: string; categoryNo: string };
}) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: [`boards/${categoryNo}/articles/${articleNo}`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<BoardItems>(key),
  });

  const { data: boardList } = useQuery({
    queryKey: ['/boards/configurations'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<InquiryCategory>(key),
  });

  return (
    <PcHelpDetailPageStyled>
      <PageTitle
        title={boardList?.data.boardConfigs.find(k => k.boardNo === Number(categoryNo))?.name}
      />
      <div className="help-detail-info-title">
        <p>{data?.data.title ?? ''}</p>
        <div>
          <div>작성일</div>
          <div>{dayjs(new Date(data?.data.registerYmdt ?? 0)).format('YYYY.MM.DD')}</div>
        </div>
      </div>
      <div className="help-detail-info-content">
        {data?.data.content ? (
          <div dangerouslySetInnerHTML={{ __html: data?.data.content }} />
        ) : (
          <Loading differ="214px" />
        )}
      </div>
      <div className="help-detail-info-button">
        <Button onClick={() => router.push(`/help/${categoryNo}`)}>목록</Button>
      </div>
    </PcHelpDetailPageStyled>
  );
};

export default PcHelpDetail;
