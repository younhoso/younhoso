'use client';

import { useState } from 'react';

import Button from '@/components/Button';

import { ConfirmModalProps } from '../pc/ConfirmModal';
import { ConfirmModalMobileStyled } from './styled';

const ConfirmModalMobile = ({
  open,
  onOk,
  content,
  onCancel,
  onOkText = '확인',
  onCancelText = '취소',
}: ConfirmModalProps) => {
  const [loading, setLoading] = useState(false);
  if (!open) {
    return null;
  }

  return (
    <ConfirmModalMobileStyled>
      <div className="confirm-wrapper">
        <div className="confirm-content">
          {content.split(/\r\n|\n|\\n|\r/).map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
        <div className="confirm-button-wrapper">
          <Button
            isLoading={loading}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await onOk?.();
              } finally {
                setLoading(false);
              }
            }}
            className="confirm-ok-button"
          >
            {onOkText}
          </Button>
          {onCancel && (
            <>
              <Button onClick={onCancel} className="confirm-cancel-button">
                {onCancelText}
              </Button>
            </>
          )}
        </div>
      </div>
    </ConfirmModalMobileStyled>
  );
};

export default ConfirmModalMobile;
