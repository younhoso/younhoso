'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import pencil from '@/assets/images/my/pencil.svg';
import AddressAddModal from '@/components/AddressAddModal';
import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import AddressModifyModal from '@/components/AddressModifyModal';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import PageTitle from '@/components/PageTitle';
import Table from '@/components/Table';
import { TableColumn } from '@/components/Table/main/pc/Table';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcMyAddressPageStyled } from '@/styles/pageStyled/pc/pcMyAddressPageStyled';
import { AddAddressBody, Address, AddressList } from '@/types';

const PcMyAddress = () => {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const [addOpen, setAddOpen] = useState(false);
  const [modifyingItem, setModifyingItem] = useState<Address | undefined>(undefined);

  const { data, refetch, isPending } = useQuery({
    queryKey: ['/profile/shipping-addresses'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<AddressList>(key),
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: (body: AddAddressBody) =>
      customAxios(PLATFORMLIST.PC).post<unknown>('/profile/shipping-addresses', body),
  });

  const { mutateAsync: modify } = useMutation({
    mutationFn: ({ addressNo, body }: { addressNo: number; body: Address }) =>
      customAxios(PLATFORMLIST.PC).put(`/profile/shipping-addresses/${addressNo}`, body),
  });
  const { mutateAsync: deleteAddress } = useMutation({
    mutationFn: (addressNo: number) =>
      customAxios(PLATFORMLIST.PC).delete(`/profile/shipping-addresses/${addressNo}`),
  });

  const column: TableColumn<Address>[] = [
    {
      label: '기본 배송지',
      field: 'check',
      render: data => (
        <Checkbox
          checked={data.defaultYn === YES}
          onChange={async e => {
            const { checked } = e.target;
            if (checked) {
              await modify({ addressNo: data.addressNo, body: { ...data, defaultYn: YES } });
              refetch();
              setConfirModalOpen({
                open: true,
                content: '기본 배송지 선택이 완료되었습니다.',
                onOk: resetConfirmModalOpen,
              });
            }
          }}
        />
      ),
    },
    {
      label: '주소',
      field: 'address',
      render: data => (
        <div>
          <p>{data.receiverAddress}</p>
          <p>{data.receiverDetailAddress}</p>
        </div>
      ),
      alignStart: true,
    },
    {
      label: '받는 분',
      field: 'receiverName',
    },
    {
      label: '연락처',
      field: 'receiverContact1',
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
    <PcMyAddressPageStyled>
      <PageTitle
        title="배송지 관리"
        noBorder
        suffix={
          <Button
            className="add-address-button"
            size="small"
            styleType="main"
            onClick={() => setAddOpen(true)}
          >
            + 새 배송지 추가
          </Button>
        }
      />

      <Table
        loading={isPending}
        fullWidth
        columns={column}
        datas={data?.data.bookedAddresses ?? []}
        dataKey="addressNo"
      />
      <AddressModifyModal
        data={modifyingItem}
        refetch={refetch}
        deleteAddress={deleteAddress}
        modify={modify}
        nearItem={data?.data.bookedAddresses.find(v => v.defaultYn === NO)}
        onClose={() => setModifyingItem(undefined)}
      />
      <AddressAddModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={async data => {
          await create(data);
          refetch();
        }}
      />
    </PcMyAddressPageStyled>
  );
};

export default PcMyAddress;
