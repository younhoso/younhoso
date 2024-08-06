'use client';

import { useQuery } from '@tanstack/react-query';

import Link from 'next/link';

import dayjs from 'dayjs';
import DOMPurify from 'dompurify';

import ButtonLink from '@/components/ButtonLink';
import Label from '@/components/Label';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { WINNER } from '@/constant/winnerConst';
import { customAxios } from '@/libs/customAxios';
import { PcEventWinnerDetailPageStyled } from '@/styles/pageStyled/pc/pcEventWinnerDetailPageStyled';

type ParamsProps = {
  params: {
    slug: string;
  };
};

const PcEventWinnerDetail = ({ params: { slug } }: ParamsProps) => {
  const {
    data: winnerDetailData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['winner-detail'],
    queryFn: async () => {
      const {
        data: { boardConfigs },
      } = await customAxios(PLATFORMLIST.PC).get(`/boards/configurations`);

      const boardId = boardConfigs.find((board: { boardId: string }) => board.boardId === WINNER);

      const { data: boardconfigData } = await customAxios(PLATFORMLIST.PC).get(
        `/boards/${boardId?.boardNo}/articles/${slug}`,
      );

      return {
        title: boardconfigData.title,
        registerYmdt: boardconfigData.registerYmdt,
        content: boardconfigData.content,
      };
    },
    enabled: !!slug,
  });

  if (error) {
    return <div className="event-error">오류가 발생했습니다</div>;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <PcEventWinnerDetailPageStyled>
      <div className="winnerdetail-title-inner">
        <p className="winnerdetail-title">{winnerDetailData?.title}</p>
        <div className="ymdt-inner">
          <Label className="label">당첨자 발표</Label>
          <p className="ymdt">{dayjs(winnerDetailData?.registerYmdt).format('YYYY.MM.DD')}</p>
        </div>
      </div>
      <div
        className="winnerdetail-description"
        dangerouslySetInnerHTML={{
          __html: winnerDetailData?.content && DOMPurify.sanitize(winnerDetailData?.content),
        }}
      />
      <div className="button-link-inner">
        <ButtonLink className="border-gray">
          <Link href={`/event/${WINNER}`}>목록</Link>
        </ButtonLink>
      </div>
    </PcEventWinnerDetailPageStyled>
  );
};

export default PcEventWinnerDetail;
