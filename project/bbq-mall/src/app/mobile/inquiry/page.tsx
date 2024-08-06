'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import chibback from '@/assets/images/help/chibback.png';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import HelpItem from '@/components/HelpItem';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { MobileInquiryPageStyled } from '@/styles/pageStyled/mobile/mobileInquiryPageStyled';
import { Inquiry, TotalCountWithItems } from '@/types';

const MobileInquiry = () => {
  const router = useRouter();
  const { isSignIn } = useHandleIsSignIn();

  const { data, isPending } = useQuery({
    queryKey: ['/inquiries'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<Inquiry>>(key),
  });

  const [emptyText, setEmptyText] = useState('');

  useEffect(() => {
    if (isSignIn) {
      setEmptyText('작성하신 1:1 문의가 없습니다.');
    } else {
      setEmptyText('회원가입 후 이용해주세요.');
    }
  }, [isSignIn]);

  return (
    <>
      <Header.Mobile title="1:1 문의" />
      <Divider.Mobile />
      {emptyText && (
        <MobileInquiryPageStyled
          className={clsx(((isPending && isSignIn) || !data?.data.items.length) && 'no-item')}
        >
          {isPending ? (
            <Loading.Mobile />
          ) : data?.data.items.length ? (
            <div className="help-item-wrapper">
              {data?.data.items.map(v => (
                <HelpItem.Mobile
                  key={v.inquiryNo}
                  title={v.inquiryTitle}
                  registerYmdt={v.registerYmdt}
                  writer={v.answer ? '답변완료' : '답변대기'}
                  onClick={() => router.push(`/inquiry/detail/${v.inquiryNo}`)}
                />
              ))}
            </div>
          ) : (
            <>
              <div>{emptyText}</div>
              <Image src={chibback} width={221} height={132} alt="no-item" unoptimized />
            </>
          )}
          <div className="footer">
            <Button
              styleType="main"
              disabled={!isSignIn}
              onClick={() => router.push('/inquiry/edit')}
              size="small"
            >
              문의하기
            </Button>
          </div>
        </MobileInquiryPageStyled>
      )}
    </>
  );
};

export default MobileInquiry;
