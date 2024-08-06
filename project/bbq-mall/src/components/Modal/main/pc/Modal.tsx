import { ReactNode } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import close from '@/assets/images/components/close-black.svg';
import Button from '@/components/Button';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';

import { ModalStyled } from './styled';

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onOkText?: string;
  onCancelText?: string;
  footer?: ReactNode | null;
  closeOnClickOutside?: boolean;
  width?: string;
  noMarginInHeader?: boolean;
  maxHeight?: string;
  noOverflow?: boolean;
  hidePaddingTop?: boolean;
  hideTitle?: boolean;
}

const Modal = ({
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
  width = '674px',
  noMarginInHeader,
  maxHeight = '800px',
  noOverflow,
  hidePaddingTop,
  hideTitle,
}: ModalProps) => {
  const wrapperRef = useHandleClickOutside<HTMLDivElement>(
    closeOnClickOutside ? onClose : () => {},
  );

  if (!open) {
    return null;
  }

  return (
    <ModalStyled className={clsx('Modal', className)} $width={width} $maxHeight={maxHeight}>
      <div className="modal_wrapper" ref={wrapperRef}>
        {!hideTitle && (
          <div className={clsx('close', noMarginInHeader && 'no-margin')}>
            <h3>{title}</h3>
            <Image src={close} alt="modal_close" onClick={onClose} width={24} height={24} />
          </div>
        )}
        <div
          className={clsx(
            'modal-children-wrapper',
            !noOverflow && 'overflow-visible',
            footer === null && 'padding-bottom-needed',
            hidePaddingTop && 'hide-padding-top',
          )}
        >
          {children}
        </div>
        <>
          {footer !== null &&
            (footer ?? (
              <div className="footer">
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
      </div>
    </ModalStyled>
  );
};

export default Modal;
