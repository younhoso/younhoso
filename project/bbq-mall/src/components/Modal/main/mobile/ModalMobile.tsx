'use client';

import Image from 'next/image';

import clsx from 'clsx';

import close from '@/assets/images/components/close-black.svg';
import Button from '@/components/Button';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';

import { ModalProps } from '../pc/Modal';
import { ModalMobileStyled } from './styled';

const ModalMobile = ({
  className,
  children,
  open,
  onClose,
  title,
  onOk,
  onCancel,
  onOkText,
  onCancelText,
  footer,
  closeOnClickOutside = true,
  width = '327px',
  hideTitle,
}: ModalProps) => {
  const wrapperRef = useHandleClickOutside<HTMLDivElement>(
    closeOnClickOutside ? onClose : () => {},
  );

  if (!open) {
    return null;
  }
  return (
    <ModalMobileStyled className={clsx('ModalMobile', className)} $width={width}>
      <div className="modal_wrapper" ref={wrapperRef}>
        {!hideTitle && (
          <div className="close">
            <h3>{title}</h3>
            <Image src={close} alt="modal_close" onClick={onClose} width={20} height={20} />
          </div>
        )}
        <div className="children-wrapper">{children}</div>
        <>
          {footer !== null &&
            (footer ?? (
              <div className="footer">
                {onCancel && (
                  <Button size="micro" onClick={onCancel}>
                    {onCancelText ?? '취소'}
                  </Button>
                )}
                <Button styleType="main" size="micro" onClick={onOk}>
                  {onOkText ?? '확인'}
                </Button>
              </div>
            ))}
        </>
      </div>
    </ModalMobileStyled>
  );
};

export default ModalMobile;
