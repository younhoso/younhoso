'use client';

import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import chibback from '@/assets/images/help/chibback.png';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import HelpItem from '@/components/HelpItem';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileHelpPageStyled } from '@/styles/pageStyled/mobile/mobileHelpPageStyled';
import { BoardItems, InquiryCategory, TotalCountWithItems } from '@/types';

const MobileHelp = ({ params: { categoryNo } }: { params: { categoryNo: string } }) => {
  const router = useRouter();
  const { data: board, isPending } = useQuery({
    queryKey: [`/boards/${categoryNo}/articles`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<BoardItems>>(key),
  });

  const { data: boardList } = useQuery({
    queryKey: ['/boards/configurations'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<InquiryCategory>(key),
  });

  return (
    <>
      <Header.Mobile
        title={
          boardList?.data.boardConfigs.find(k => k.boardNo === Number(categoryNo))?.name ??
          '공지사항'
        }
      />
      <Divider.Mobile />
      <MobileHelpPageStyled className={clsx((isPending || !board?.data.items.length) && 'no-item')}>
        {isPending ? (
          <Loading.Mobile />
        ) : board?.data.items.length ? (
          <div className="mobile-help-item-wrappper">
            {board?.data.items
              .sort((a, b) => Number(b.notice) - Number(a.notice))
              .map(v => (
                <HelpItem.Mobile
                  onClick={() => router.push(`/help/${categoryNo}/${v.articleNo}`)}
                  key={v.articleNo}
                  title={v.title}
                  notice={v.notice}
                  registerYmdt={v.registerYmdt}
                  showPin
                  showArrow
                  showNew
                />
              ))}
          </div>
        ) : (
          <>
            <div>작성된 게시글이 존재하지 않습니다.</div>
            <Image src={chibback} width={221} height={132} alt="no-item" unoptimized />
          </>
        )}
      </MobileHelpPageStyled>
    </>
  );
};

export default MobileHelp;
