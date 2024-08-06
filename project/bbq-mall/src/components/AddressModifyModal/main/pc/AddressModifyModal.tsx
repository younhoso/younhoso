'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { pick } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import Input from '@/components/Input';
import { ModalProps } from '@/components/Modal/main/pc/Modal';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Address } from '@/types';
import { changedToPhoneNumberRegex, phoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

import { AddressModifyModalStyled } from './styled';

export interface AddressModifyModalProps extends Pick<ModalProps, 'onClose'> {
  className?: string;
  data: Address | undefined;
  refetch: () => Promise<any>;
  deleteAddress: (addressNo: number) => Promise<any>;
  modify: ({ addressNo, body }: { addressNo: number; body: Address }) => Promise<any>;
  nearItem: Address | undefined;
}

const AddressModifyModal = ({
  className,
  refetch,
  modify,
  data,
  deleteAddress,
  nearItem,
  onClose,
}: AddressModifyModalProps) => {
  const [modifyingItem, setModifyingItem] = useState<Address | undefined>(data);
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  useEffect(() => {
    setModifyingItem(data);
  }, [data]);

  return (
    <AddressModifyModalStyled
      width="506px"
      onCancelText="삭제"
      onOkText="저장"
      onCancel={async () => {
        if (modifyingItem?.defaultYn === YES) {
          if (nearItem) {
            await modify({
              addressNo: nearItem.addressNo,
              body: { ...nearItem, defaultYn: YES },
            });
          } else {
            await modify({
              addressNo: modifyingItem?.addressNo,
              body: { ...modifyingItem, defaultYn: NO },
            });
          }
        }
        await deleteAddress(modifyingItem?.addressNo as number);
        await refetch();
        onClose();
      }}
      onClose={onClose}
      onOk={async () => {
        if (
          Object.values(pick(modifyingItem, ['receiverName', 'receiverContact1'])).some(v => !v)
        ) {
          return setConfirModalOpen({
            open: true,
            content: '받는 분과 연락처를 입력해주세요.',
            onOk: resetConfirmModalOpen,
          });
        }

        if (
          modifyingItem?.receiverContact1 &&
          !phoneNumberRegex.test(modifyingItem?.receiverContact1)
        ) {
          return setConfirModalOpen({
            open: true,
            content: '핸드폰 번호는 010-0000-0000의 형식으로 작성해주세요.',
            onOk: resetConfirmModalOpen,
          });
        }

        await modify({
          addressNo: modifyingItem?.addressNo as number,
          body: modifyingItem as Address,
        });
        await refetch();
        onClose();
      }}
      open={!!data}
      title="배송지 수정"
      closeOnClickOutside={false}
      className={clsx('AddressModifyModal', className)}
    >
      <div className="modal-label">{modifyingItem?.receiverAddress}</div>
      <Input
        defaultValue={modifyingItem?.receiverDetailAddress}
        placeholder="나머지 주소를 입력해주세요"
        onChange={e =>
          setModifyingItem({
            ...modifyingItem,
            receiverDetailAddress: e.target.value,
          } as Address)
        }
      />
      <div className="modal-label">받는 분</div>
      <Input
        placeholder="받는 분 이름을 입력해주세요"
        defaultValue={modifyingItem?.receiverName}
        onChange={e =>
          setModifyingItem({ ...modifyingItem, receiverName: e.target.value } as Address)
        }
      />
      <div className="modal-label">휴대폰</div>
      {modifyingItem && (
        <Input
          placeholder="연락처를 입력해주세요"
          maxLength={13}
          onPaste={e => e.preventDefault()}
          onChange={e =>
            setModifyingItem({
              ...modifyingItem,
              receiverContact1: changedToPhoneNumberRegex(e.target.value),
            } as Address)
          }
          value={modifyingItem?.receiverContact1}
        />
      )}
    </AddressModifyModalStyled>
  );
};

export default AddressModifyModal;
