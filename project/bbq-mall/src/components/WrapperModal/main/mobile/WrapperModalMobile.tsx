'use client';

import { ReactNode, useEffect } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import leftArrow from '@/assets/images/components/left-arrow-gray.svg';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { isNotWebviewStore } from '@/stores/isNotWebview';

import { WrapperModalMobileStyled } from './styled';

export interface WrapperModalMobileProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode | null;
  onOk?: () => void;
  onCancel?: () => void;
  onOkText?: string;
  onCancelText?: string;
  hideHeaderDivider?: boolean;
}

const WrapperModalMobile = ({
  className,
  open,
  onClose,
  title,
  children,
  footer,
  onOk,
  onCancel,
  onOkText,
  onCancelText,
  hideHeaderDivider,
}: WrapperModalMobileProps) => {
  const isNotWebview = useRecoilValue(isNotWebviewStore);
  if (!open) {
    return null;
  }

  return (
    <WrapperModalMobileStyled
      className={clsx('WrapperModalMobile', className, isNotWebview && 'not-webview')}
    >
      <div className="wrapper-modal-header">
        <Image src={leftArrow} alt="left-arrow" width={24} height={24} onClick={onClose} />
        <p>{title}</p>
        <div />
      </div>
      {!hideHeaderDivider && <Divider.Mobile />}
      <div className={clsx('wrapper-modal-children', footer === null && 'no-footer')}>
        {children}
      </div>
      <>
        {footer !== null &&
          (footer ?? (
            <div className="wrapper-modal-footer">
              {onCancel && (
                <Button size="small" onClick={onCancel}>
                  {onCancelText ?? '취소'}
                </Button>
              )}
              <Button styleType="main" size="small" onClick={onOk}>
                {onOkText ?? '확인'}
              </Button>
            </div>
          ))}
      </>
    </WrapperModalMobileStyled>
  );
};

export default WrapperModalMobile;
