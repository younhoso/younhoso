'use client';

import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import clsx from 'clsx';

import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import { theme } from '@/provider/CustomThemeProvider';
import { changedToPhoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

import { AddressEditMobileStyled } from './styled';

export interface CreateAddressForm {
  receiverAddress: string | null;
  receiverDetailAddress: string | null;
  receiverName: string | null;
  receiverContact1: string | null;
  defaultYn: typeof YES | typeof NO;
}

export interface AddressEditMobileProps {
  className?: string;
  onSubmit: SubmitHandler<CreateAddressForm>;
  addressButtonWrapper: ReactNode;
  defaultValues: CreateAddressForm;
  hideDefaultSave?: boolean;
}

const AddressEditMobile = ({
  className,
  onSubmit,
  addressButtonWrapper,
  defaultValues,
  hideDefaultSave,
}: AddressEditMobileProps) => {
  const { getValues, register, setValue, handleSubmit, watch } = useForm<CreateAddressForm>({
    defaultValues,
  });
  return (
    <AddressEditMobileStyled
      className={clsx('AddressEditMobile', className)}
      onSubmit={handleSubmit(onSubmit, e => {
        console.error(e);
      })}
    >
      <div className="address-label">{getValues('receiverAddress')}</div>
      <Input.Mobile
        placeholder="나머지 주소를 입력해주세요"
        {...register('receiverDetailAddress')}
      />
      <Divider borderColor={theme.colors.grayaea} />
      <div className="address-label">받는 분</div>
      <Input.Mobile placeholder="받는 분 이름을 입력해주세요" {...register('receiverName')} />
      <div className={clsx('address-label', 'margin-added')}>휴대폰</div>
      <Input.Mobile
        placeholder="연락처를 입력해주세요"
        maxLength={13}
        onPaste={e => e.preventDefault()}
        value={(watch('receiverContact1') as string) ?? ''}
        onChange={e => setValue('receiverContact1', changedToPhoneNumberRegex(e.target.value))}
      />
      {watch('defaultYn') !== undefined && !hideDefaultSave && (
        <Checkbox
          className="margin-added"
          label="기본 배송지로 저장"
          onChange={e => setValue('defaultYn', e.target.checked ? YES : NO)}
          defaultChecked={watch('defaultYn') === YES}
        />
      )}
      <div className="address-button-wrapper">{addressButtonWrapper}</div>
    </AddressEditMobileStyled>
  );
};

export default AddressEditMobile;
