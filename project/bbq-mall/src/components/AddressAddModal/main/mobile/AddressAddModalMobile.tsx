'use client';

import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import Image from 'next/image';

import clsx from 'clsx';
import { pick } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import searchIcon from '@/assets/images/components/search-black.svg';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import { theme } from '@/provider/CustomThemeProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { AddressModalState, RestAddressInfo } from '@/types';
import { changedToPhoneNumberRegex, phoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

import {
  AddressAddModalProps,
  DaumBody,
  NO,
  YES,
  defaultCreateAddressData,
  handleDaumPostComplete,
  initialAddressData,
} from '../pc/AddressAddModal';
import { AddressAddModalMobileStyled } from './styled';

const AddressAddModalMobile = ({
  className,
  open,
  onSave,
  onClose,
  hideDefaultSave,
  children,
}: AddressAddModalProps) => {
  const [address, setAddress] = useState<AddressModalState | undefined>(undefined);
  const [restInfo, setRestInfo] = useState<RestAddressInfo>(initialAddressData);
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const handleComplete = (data: DaumBody) => {
    setAddress(handleDaumPostComplete(data));
  };
  const resetAddress = () => {
    setAddress(undefined);
    setRestInfo(initialAddressData);
  };

  useEffect(() => {
    resetAddress();
  }, [open]);
  return (
    <AddressAddModalMobileStyled
      className={clsx('AddressAddModal', className, address && 'padding-needeed')}
      open={open}
      onOk={async () => {
        const notEnough = Object.values(pick(restInfo, ['receiverName', 'receiverContact1'])).some(
          v => !v,
        );
        if (!address || notEnough) {
          return setConfirModalOpen({
            open: true,
            content: '받는 분과 연락처를 입력해주세요.',
            onOk: resetConfirmModalOpen,
          });
        }
        if (!phoneNumberRegex.test(restInfo.receiverContact1)) {
          return setConfirModalOpen({
            open: true,
            content: '핸드폰 번호는 010-0000-0000의 형식으로 작성해주세요.',
            onOk: resetConfirmModalOpen,
          });
        }

        await onSave({
          ...address,
          ...restInfo,
          ...defaultCreateAddressData,
        });
        onClose();
      }}
      onClose={onClose}
      onOkText="저장"
      footer={!address ? null : undefined}
      title="배송지 추가"
    >
      {!address ? (
        <DaumPostcodeEmbed
          style={{
            width: '100%',
            height: `calc(100vh - ${theme.sizes.mobileHeaderHeight} - 10px)`,
          }}
          onComplete={handleComplete}
          className="address-search"
          autoClose={false}
        />
      ) : (
        <>
          <div className="re-search-wrapper">
            <div>{address.receiverAddress}</div>
            <Button styleType="sub" size="micro" onClick={resetAddress}>
              <Image src={searchIcon} width={18} height={18} alt="search" />
              재검색
            </Button>
          </div>
          <Input
            onChange={e => setRestInfo({ ...restInfo, receiverDetailAddress: e.target.value })}
            placeholder="나머지 주소를 입력해주세요"
            className="middle-input"
          />
          <Divider />
          <Input
            onChange={e => setRestInfo({ ...restInfo, receiverName: e.target.value })}
            placeholder="받는 분 이름을 입력해주세요"
          />
          <Input
            onChange={e => {
              setRestInfo({
                ...restInfo,
                receiverContact1: changedToPhoneNumberRegex(e.target.value),
              });
            }}
            onPaste={e => e.preventDefault()}
            value={restInfo.receiverContact1}
            maxLength={13}
            placeholder="연락처를 입력해주세요"
            className="middle-input"
          />
          {children}
          {!hideDefaultSave && (
            <Checkbox
              label="기본 배송지로 저장"
              checked={restInfo.defaultYn === YES}
              onChange={e => setRestInfo({ ...restInfo, defaultYn: e.target.checked ? YES : NO })}
            />
          )}
        </>
      )}
    </AddressAddModalMobileStyled>
  );
};

export default AddressAddModalMobile;
