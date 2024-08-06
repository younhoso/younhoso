'use client';

import { useState } from 'react';

import Button from '@/components/Button';

import { ConfirmModalStyled } from './styled';

export interface ConfirmModalProps {
  open: boolean;
  content: string;
  onOk?: () => unknown | Promise<void>;
  onCancel?: () => unknown;
  onOkText?: string;
  onCancelText?: string;
}

const ConfirmModal = ({
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
    <ConfirmModalStyled>
      <div className="confirm-wrapper">
        <div className="confirm-content">
          {content.split(/\r\n|\n|\\n|\r/).map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </div>
        <div className="confirm-button-wrapper">
          {onCancel && (
            <>
              <Button onClick={onCancel}>{onCancelText}</Button>
              <div className="divider" />
            </>
          )}
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
          >
            {onOkText}
          </Button>
        </div>
      </div>
    </ConfirmModalStyled>
  );
};

export default ConfirmModal;
