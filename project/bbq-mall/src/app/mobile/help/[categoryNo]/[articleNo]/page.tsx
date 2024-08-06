'use client';

import { useQuery } from '@tanstack/react-query';

import Divider from '@/components/Divider';
import Header from '@/components/Header';
import HelpItem from '@/components/HelpItem';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { MobileHelpDetailPageStyled } from '@/styles/pageStyled/mobile/mobileHelpDetailPageStyled';
import { BoardItems, InquiryCategory } from '@/types';

const MobileHelpDetail = ({
  params: { articleNo, categoryNo },
}: {
  params: { articleNo: string; categoryNo: string };
}) => {
  const { data: boardList } = useQuery({
    queryKey: ['/boards/configurations'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<InquiryCategory>(key),
  });

  const { data } = useQuery({
    queryKey: [`boards/${categoryNo}/articles/${articleNo}`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<BoardItems>(key),
  });

  return (
    <>
      <Header.Mobile
        title={
          boardList?.data.boardConfigs.find(k => k.boardNo === Number(categoryNo))?.name ??
          '공지사항'
        }
      />
      <MobileHelpDetailPageStyled>
        <Divider.Mobile />
        {data ? (
          <>
            <HelpItem.Mobile
              key={data.data.articleNo}
              title={data.data.title}
              notice={data.data.notice}
              registerYmdt={data.data.registerYmdt}
            />
            <div className="help-mobile-content">
              <div dangerouslySetInnerHTML={{ __html: data.data.content }} />
            </div>
          </>
        ) : (
          <Loading.Mobile />
        )}
      </MobileHelpDetailPageStyled>
    </>
  );
};

export default MobileHelpDetail;
