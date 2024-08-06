'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';

import { WriteReviewStyled } from './styled';

export interface WriteReviewProps {
  className?: string;
  resetClaimType: () => void;
}

const WriteReview = ({ className, resetClaimType }: WriteReviewProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isSignIn) {
      return setConfirmModalOpen({
        open: true,
        content: '후기 작성은 회원만 가능합니다.',
        onOk: () => {
          resetOpenConfirm();
          resetClaimType();
        },
      });
    }
    setConfirmModalOpen({
      open: true,
      content: '확인을 누르시면 리뷰 작성 페이지로 이동됩니다.',
      onOk: async () => {
        router.push('/my/review/available');
        resetOpenConfirm();
        resetClaimType();
      },
      onCancel: () => {
        resetOpenConfirm();
        resetClaimType();
      },
    });
  }, [isLoading]);
  return <WriteReviewStyled className={clsx('WriteReview', className)}></WriteReviewStyled>;
};

export default WriteReview;
