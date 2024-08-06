'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import pencil from '@/assets/images/my/pencil.svg';
import AddressAddModal from '@/components/AddressAddModal';
import { NO } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import AddressModifyModal from '@/components/AddressModifyModal';
import Checkbox from '@/components/Checkbox';
import { ModalProps } from '@/components/Modal/main/pc/Modal';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { AddAddressBody, Address } from '@/types';

import { AddressListStyled } from './styled';

export interface AddressListProps extends Pick<ModalProps, 'open' | 'onClose'> {
  className?: string;
  addressList: Address[] | undefined;
  selected: Address | undefined;
  onChange: (v: Address) => void;
  refetch: () => Promise<any>;
}

const AddressListModal = ({
  className,
  open,
  onClose,
  addressList,
  selected,
  onChange,
  refetch,
}: AddressListProps) => {
  const [addOpen, setAddOpen] = useState(false);
  const [modifyingItem, setModifyingItem] = useState<Address | undefined>(undefined);

  const { mutateAsync: create } = useMutation({
    mutationFn: (body: AddAddressBody) =>
      customAxios(PLATFORMLIST.PC).post<Address>('/profile/shipping-addresses', body),
  });

  const { mutateAsync: modify } = useMutation({
    mutationFn: ({ addressNo, body }: { addressNo: number; body: Address }) =>
      customAxios(PLATFORMLIST.PC).put(`/profile/shipping-addresses/${addressNo}`, body),
  });
  const { mutateAsync: deleteAddress } = useMutation({
    mutationFn: (addressNo: number) =>
      customAxios(PLATFORMLIST.PC).delete(`/profile/shipping-addresses/${addressNo}`),
  });

  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const onChangeWithOpenModal = (data: Address) => {
    onChange(data);
    setConfirModalOpen({
      open: true,
      content: '배송지가 변경되었습니다.',
      onOk: resetConfirmModalOpen,
    });
  };

  const columns: TableColumn<Address>[] = [
    {
      label: '선택',
      field: 'no',
      render: data => (
        <Checkbox
          checked={selected?.addressNo === data.addressNo}
          onChange={v => {
            if (v) {
              onChangeWithOpenModal(data);
            }
          }}
        />
      ),
    },
    {
      label: '주소',
      field: 'address',
      render: data => (
        <div className="table-address">
          <p>
            {data.receiverAddress} {data.receiverDetailAddress}
          </p>
          <p>
            {data.receiverName} / {data.receiverContact1}
          </p>
        </div>
      ),
      alignStart: true,
    },
    {
      label: '수정',
      field: 'modify',
      render: data => (
        <Image
          className="cursor-pointer"
          src={pencil}
          width={26}
          height={26}
          alt="modify"
          onClick={() => setModifyingItem(data)}
        />
      ),
    },
  ];
  return (
    <>
      <AddressListStyled
        title="배송지 목록"
        open={open}
        onClose={onClose}
        onOkText="+ 새 배송지 추가"
        closeOnClickOutside={false}
        onOk={() => setAddOpen(true)}
        className={clsx('AddressListModal', className)}
      >
        <Table
          fullWidth
          dataKey="addressNo"
          loading={!addressList}
          datas={addressList ?? []}
          columns={columns}
        />
      </AddressListStyled>
      <AddressModifyModal
        data={modifyingItem}
        refetch={refetch}
        deleteAddress={deleteAddress}
        modify={modify}
        nearItem={addressList?.find(v => v.defaultYn === NO)}
        onClose={() => setModifyingItem(undefined)}
      />
      <AddressAddModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={async data => {
          const res = await create(data);
          onChangeWithOpenModal(res.data);
          refetch();
        }}
      />
    </>
  );
};

export default AddressListModal;
