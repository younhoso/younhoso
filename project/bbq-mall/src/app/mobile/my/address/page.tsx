'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import chickenWithShock from '@/assets/images/my/chicken-with-shock.png';
import { YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import AddressItem from '@/components/AddressItem';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyAddressPageStyled } from '@/styles/pageStyled/mobile/mobileMyAddressPageStyled';
import { Address, AddressList } from '@/types';

const MobileMyAddress = () => {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();

  const { data, refetch, isPending } = useQuery({
    queryKey: ['/profile/shipping-addresses'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.MOBILE_WEB).get<AddressList>(key),
  });

  const { mutateAsync: modify } = useMutation({
    mutationFn: ({ addressNo, body }: { addressNo: number; body: Address }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).put(`/profile/shipping-addresses/${addressNo}`, body),
  });

  if (isPending) {
    return <Loading.Mobile />;
  }

  return (
    <MobileMyAddressPageStyled
      className={clsx((isPending || !data?.data.bookedAddresses.length) && 'no-item')}
    >
      {!data?.data.bookedAddresses.length ? (
        <>
          저장된 배송지가 없습니다.
          <Image src={chickenWithShock} width={221} height={132} alt="no-item" unoptimized />
        </>
      ) : (
        <div className="address-item-wrapper">
          {data?.data.bookedAddresses.map(v => (
            <AddressItem.Mobile
              onClickModify={() =>
                router.push(
                  `/my/address/edit?receiver_address=${v.receiverAddress}&receiver_detail_address=${v.receiverDetailAddress}&receiver_name=${v.receiverName}&receiver_contact=${v.receiverContact1}&address_no=${v.addressNo}&default_yn=${v.defaultYn}`,
                )
              }
              key={v.addressNo}
              onClickCheckbox={async e => {
                if (e) {
                  await modify({ addressNo: v.addressNo, body: { ...v, defaultYn: YES } });
                  refetch();
                  setConfirModalOpen({
                    open: true,
                    content: '기본 배송지 선택이 완료되었습니다.',
                    onOk: resetConfirmModalOpen,
                  });
                }
              }}
              data={v}
            />
          ))}
        </div>
      )}
      <div className="add-address-button-wrapper">
        <Button styleType="main" size="small" onClick={() => router.push('/my/address/search')}>
          + 새 배송지 추가
        </Button>
      </div>
    </MobileMyAddressPageStyled>
  );
};

export default MobileMyAddress;
