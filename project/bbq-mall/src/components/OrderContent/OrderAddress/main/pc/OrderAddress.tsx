'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import AddressAddModal from '@/components/AddressAddModal';
import AddressListModal from '@/components/AddressList/main/pc/AddressListModal';
import Button from '@/components/Button';
import Input from '@/components/Input';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import Select from '@/components/Select';
import { Address, AddressList } from '@/types';

import { OrderAddressStyled } from './styled';

export interface OrderAddressProps {
  className?: string;
  addressList: AddressList | undefined;
  isLoading: boolean;
  refetch: () => Promise<any>;
  isRefetching: boolean;
  onChange?: (v?: Address) => void;
  onChangeRequest?: (v: string) => void;
  isSignIn: boolean;
}

export const MANUAL_TYPE = '직접 입력';

export const orderRequestList = [
  '문 앞에 놓아주세요',
  '부재 시 경비실에 맡겨주세요',
  '부재 시 연락주세요',
  '배송 전 연락주세요',
  '파손의 위험이 있습니다. 배송 시 주의해주세요',
  MANUAL_TYPE,
];

const OrderAddress = ({
  className,
  addressList,
  isLoading,
  refetch,
  isRefetching,
  onChange,
  onChangeRequest,
  isSignIn,
}: OrderAddressProps) => {
  const [orderRequest, setOrderRequest] = useState('');
  const [selected, setSelected] = useState<Address | undefined>(undefined);
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
    if (!isRefetching && selected) {
      setWithOnchange(addressList?.bookedAddresses.find(v => v.addressNo === selected.addressNo));
    }
  }, [isRefetching]);

  const isNoItem = !isLoading && !selected;
  const noItemWithNoLogin = !isSignIn && !selected;

  return (
    <>
      <OrderAddressStyled label="배송지 정보" className={clsx('OrderAddress', className)}>
        <OrderContentItem label="배송지" className="order-address-where" alignCenter>
          <div className="order-address-flex">
            {isNoItem ? (
              <div className="line-height-needed">기본 배송지가 존재하지 않습니다.</div>
            ) : noItemWithNoLogin ? (
              <div className="line-height-needed">배송지를 등록해주세요.</div>
            ) : (
              <div>
                <p>
                  {selected?.receiverAddress} {selected?.receiverDetailAddress}
                </p>
                <p>
                  {selected?.receiverName} / {selected?.receiverContact1}
                </p>
              </div>
            )}

            <Button size="micro" onClick={() => setModalOpen(true)}>
              {isNoItem || noItemWithNoLogin ? '등록' : '변경'}
            </Button>
          </div>
        </OrderContentItem>
        <OrderContentItem label="배송 요청사항" alignCenter>
          <Select
            placeholder="배송시 요청사항을 선택해주세요."
            optionList={orderRequestList.map(v => ({ label: v, value: v }))}
            onChange={e => {
              setOrderRequest(e!);
              onChangeRequest?.(e!);
            }}
          />
          {orderRequest === MANUAL_TYPE && (
            <Input
              placeholder="기타 내용을 입력해주세요 (한글 20자 이내)"
              maxLength={20}
              className="manual-type"
            />
          )}
        </OrderContentItem>
      </OrderAddressStyled>
      <AddressListModal
        open={modalOpen && isSignIn}
        onClose={() => setModalOpen(false)}
        addressList={addressList?.bookedAddresses}
        selected={selected}
        onChange={setWithOnchange}
        refetch={refetch}
      />
      <AddressAddModal
        open={modalOpen && !isSignIn}
        hideDefaultSave
        onClose={() => setModalOpen(false)}
        onSave={async data => {
          setWithOnchange(data as unknown as Address);
        }}
      />
    </>
  );
};

export default OrderAddress;
