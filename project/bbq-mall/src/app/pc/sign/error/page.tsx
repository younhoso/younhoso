'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcSignErrorPageStyled } from '@/styles/pageStyled/pc/pcSignErrorPageStyled';
import { resetAuthCookie } from '@/utils/resetAuthCookie';

const PcSignError = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const onReset = () => {
    resetConfirmModalOpen();
    resetAuthCookie();
    signOut();
  };

  useEffect(() => {
    router.push('/sign/in');
    setConfirmModalOpen({
      open: true,
      content:
        'SNS연동되어 있지 않은 계정입니다.\n회원가입을 후 다시 진행해주세요.\n확인을 누르시면 회원가입 페이지로 이동합니다.',
      onOk: () => {
        window.open('https://bbq.co.kr/member/login');
        onReset();
      },
      onCancel: onReset,
    });
  }, [pathname]);
  return <PcSignErrorPageStyled></PcSignErrorPageStyled>;
};

export default PcSignError;
