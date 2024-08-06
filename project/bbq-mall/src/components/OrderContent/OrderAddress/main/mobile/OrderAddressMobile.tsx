'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import chickenWithShock from '@/assets/images/my/chicken-with-shock.png';
import {
  NO,
  defaultCreateAddressData,
  handleDaumPostComplete,
} from '@/components/AddressAddModal/main/pc/AddressAddModal';
import AddressEdit from '@/components/AddressEdit';
import { CreateAddressForm } from '@/components/AddressEdit/main/mobile/AddressEditMobile';
import AddressItem from '@/components/AddressItem';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import WrapperModal from '@/components/WrapperModal';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { theme } from '@/provider/CustomThemeProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { AddAddressBody, Address } from '@/types';
import { RequiredProperty } from '@/types/RequiredProperty';

import { MANUAL_TYPE, OrderAddressProps, orderRequestList } from '../pc/OrderAddress';
import { OrderAddressMobileStyled } from './styled';

const OrderAddressMobile = ({
  className,
  addressList,
  isLoading,
  refetch,
  isRefetching,
  onChange,
  isSignIn,
  onChangeRequest,
}: OrderAddressProps) => {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const [orderRequest, setorderRequest] = useState('');
  const [selected, setSelected] = useState<Address | undefined>(undefined);
  const [tempSelected, setTempSelected] = useState<Partial<Address> | undefined>(undefined);
  const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const setWithOnchange = (d: Address | undefined) => {
    setSelected(d);
    onChange?.(d);
  };

  useEffect(() => {
    if (!isLoading) {
      setWithOnchange(addressList?.defaultAddress);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isRefetching && selected?.addressNo) {
      setWithOnchange(addressList?.bookedAddresses.find(v => v.addressNo === selected.addressNo));
    }
  }, [isRefetching]);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalOpen]);

  const isNoItem = !isLoading && !selected;
  const noItemWithNoLogin = !isSignIn && !selected;

  const { mutateAsync: create, isPending } = useMutation({
    mutationFn: (body: AddAddressBody) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post<Address>('/profile/shipping-addresses', body),
  });

  return (
    <OrderAddressMobileStyled title="배송지 정보" className={clsx('OrderAddressMobile', className)}>
      {isNoItem ? (
        <div className="no-address-exist">
          <p>기본 배송지가 존재하지 않습니다.</p>
          <p>배송지 등록 이후 이용하실 수 있습니다.</p>
          <Button size="micro" onClick={() => setModalOpen(true)}>
            등록하러 가기
          </Button>
        </div>
      ) : noItemWithNoLogin ? (
        <div className="no-address-exist">
          <p>배송지 설정 이후 이용하실 수 있습니다.</p>
          <Button size="micro" onClick={() => setModalOpen(true)}>
            설정
          </Button>
        </div>
      ) : (
        <>
          <div className="order-address-flex">
            <p>
              {selected?.receiverAddress} {selected?.receiverDetailAddress}
            </p>

            <Button size="micro" onClick={() => setModalOpen(true)}>
              변경
            </Button>
          </div>
          <p className="receiver-info">
            {selected?.receiverName} | {selected?.receiverContact1}
          </p>
          <Select.Mobile
            placeholder="배송시 요청사항을 선택해주세요."
            optionList={orderRequestList.map(v => ({ label: v, value: v }))}
            onChange={e => {
              setorderRequest(e!);
              onChangeRequest?.(e!);
            }}
          />
          {orderRequest === MANUAL_TYPE && (
            <Input.Mobile
              placeholder="기타 내용을 입력해주세요 (한글 20자 이내)"
              maxLength={20}
              className="manual-type"
            />
          )}
        </>
      )}

      <WrapperModal.Mobile
        open={modalOpen && isSignIn}
        onClose={() => setModalOpen(false)}
        title="배송지 변경"
        footer={null}
        className="address-change-modal"
      >
        {!addressList?.bookedAddresses.length ? (
          <div className="no-data">
            <p>저장된 배송지가 없습니다.</p>
            <Image src={chickenWithShock} width={221} height={132} alt="no-item" unoptimized />
          </div>
        ) : (
          addressList?.bookedAddresses.map(v => (
            <AddressItem.Mobile
              checked={selected?.addressNo === v.addressNo}
              key={v.addressNo}
              onClickCheckbox={async e => {
                if (e) {
                  setWithOnchange(v);
                  refetch();
                  setConfirModalOpen({
                    open: true,
                    content: '배송지가 변경되었습니다.',
                    onOk: () => {
                      resetConfirmModalOpen();
                      setModalOpen(false);
                    },
                  });
                }
              }}
              data={v}
            />
          ))
        )}
        <div className="address-add-button-wrapper">
          <Button
            onClick={() => setAddAddressModalOpen(true)}
            size="small"
            styleType="main"
            fullWidth
          >
            + 새 배송지 추가
          </Button>
        </div>
      </WrapperModal.Mobile>
      <WrapperModal.Mobile
        open={(modalOpen && !isSignIn) || addAddressModalOpen}
        onClose={() => {
          isSignIn ? setAddAddressModalOpen(false) : setModalOpen(false);
          setTempSelected(undefined);
        }}
        title="배송지 등록"
        footer={null}
      >
        {!tempSelected ? (
          <DaumPostcodeEmbed
            style={{
              width: '100%',
              height: `calc(100vh - ${theme.sizes.mobileHeaderHeight} - 10px)`,
            }}
            onComplete={data => {
              const res = handleDaumPostComplete(data);
              setTempSelected(res);
            }}
            autoClose={false}
          />
        ) : (
          <div className="address-edit-wrppaer">
            <AddressEdit.Mobile
              hideDefaultSave={!isSignIn}
              onSubmit={async data => {
                let object = {
                  ...(data as RequiredProperty<CreateAddressForm>),
                  ...tempSelected,
                  ...(defaultCreateAddressData as any),
                };
                if (isSignIn) {
                  const res = await create(object);
                  object = res.data;
                  await refetch();
                }
                setWithOnchange(object);
                setModalOpen(false);
                setTempSelected(undefined);
                setAddAddressModalOpen(false);
              }}
              defaultValues={{
                receiverAddress: tempSelected.receiverAddress ?? '',
                receiverDetailAddress: null,
                receiverName: '',
                receiverContact1: null,
                defaultYn: NO,
              }}
              addressButtonWrapper={
                <Button
                  size="small"
                  styleType="main"
                  className="full-width"
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                >
                  배송지 등록
                </Button>
              }
            />
          </div>
        )}
      </WrapperModal.Mobile>
    </OrderAddressMobileStyled>
  );
};

export default OrderAddressMobile;
