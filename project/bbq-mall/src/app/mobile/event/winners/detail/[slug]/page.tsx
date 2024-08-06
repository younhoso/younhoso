'use client';

import { useQuery } from '@tanstack/react-query';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import dayjs from 'dayjs';
import DOMPurify from 'dompurify';

import ButtonLink from '@/components/ButtonLink';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import Label from '@/components/Label';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { WINNER } from '@/constant/winnerConst';
import { customAxios } from '@/libs/customAxios';
import { MobileEventWinnerDetailPageStyled } from '@/styles/pageStyled/mobile/mobileEventWinnerDetailPageStyled';

type ParamsProps = {
  params: {
    slug: string;
  };
};

const MobileEventWinnerDetail = ({ params: { slug } }: ParamsProps) => {
  const routerPathName = usePathname();
  const {
    data: winnerDetailData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['winner-detail'],
    queryFn: async () => {
      const {
        data: { boardConfigs },
      } = await customAxios(PLATFORMLIST.MOBILE_WEB).get(`/boards/configurations`);

      const boardId = boardConfigs.find((board: { boardId: string }) => board.boardId === WINNER);

      const { data: boardconfigData } = await customAxios(PLATFORMLIST.MOBILE_WEB).get(
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

  return (
    <>
      <Header.Mobile
        title={routerPathName.includes('detail') ? '당첨자 발표' : '이벤트'}
        hideBorderBottom={true}
      />
      <Divider.Mobile />
      <MobileEventWinnerDetailPageStyled>
        {isPending ? (
          <div className="event-isLoading">
            <Loading.Mobile />
          </div>
        ) : (
          <>
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
          </>
        )}
      </MobileEventWinnerDetailPageStyled>
    </>
  );
};

export default MobileEventWinnerDetail;
