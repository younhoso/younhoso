import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ContentAPI } from '@/apis';
import { Flex, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { RelayPageTemplate } from '@/components/templates';
import { FONTSIZE_18, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { Pagination, Relay } from '@/types';

const NeedLoginPopup = () => {
  const router = useRouter();
  const { closeModal } = useModal();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1em'} align="center">
        로그인이 필요한 서비스입니다.
      </Text>
      <Space.H6 />
      <Button
        full
        color="red"
        shape="round"
        text="확인"
        onClick={() => {
          closeModal();
          router.push(`/member/login?redirect_to=${encodeURIComponent(router.asPath)}`);
        }}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};

export default function RelayPage() {
  const { openModal } = useModal();
  const { member } = useAuth();
  const [data, setData] = useState<Pagination<Relay> | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);

  // 이벤트 목록 API 함수
  const fetch = useCallback(({ page }: { page: number }) => {
    return new Promise<Pagination<Relay>>((resolve, reject) => {
      ContentAPI.Relay.getList({ page: page, size: 10 })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, []);

  // 불러오기 실행
  useEffect(() => {
    if (!member) return;
    fetch({ page: currentPage })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage, member]);

  useEffect(() => {
    if (typeof member === 'undefined') {
      return;
    }
    if (member === null) {
      openModal({
        title: '로그인 알림',
        body: <NeedLoginPopup />,
      });
    }
  }, [member]);

  if (!data) return null;

  return (
    <>
      <RelayPageTemplate data={data} page={currentPage} setPage={setCurrentPageIndex} />
    </>
  );
}
