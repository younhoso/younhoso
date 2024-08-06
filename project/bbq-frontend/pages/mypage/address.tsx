import { getSession, signIn } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { MyPageAddressPageTemplate } from '@/components/templates';
import { accountDefaultAddressState } from '@/stores';
import { Address } from '@/types';

export default function MyPageAddress() {
  const refreshDefaultAddressState = useRecoilRefresher_UNSTABLE(accountDefaultAddressState);

  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetch = useCallback(async () => {
    const res = await AccountAPI.Address.getList();
    setAddresses(res);
  }, []);

  const refetch = useCallback(async () => {
    fetch();
    refreshDefaultAddressState();
  }, [fetch, refreshDefaultAddressState]);

  const handleAddressDeleteButtonClick = useCallback(
    async ({ addressId }: { addressId: number }) => {
      if (!confirm('정말 삭제하시겠습니까?')) return;
      const addresses = await AccountAPI.Address.getList();
      const address = addresses.filter(address => {
        return address.id === addressId;
      })[0];
      if (!address || address.isDefault) {
        return;
      }
      await AccountAPI.Address.delete({ id: address.id });
      refetch();
    },
    [refetch],
  );

  const handleAddressDefaultCheck = useCallback(
    async ({ addressId }: { addressId: number }) => {
      const addresses = await AccountAPI.Address.getList();
      if (addresses.length < 2) {
        alert('기본 배송지를 수정하려면 최소 2개 이상의 배송지가 존재해야 합니다.');
        return;
      } // 배송지가 2개보다 작으면 의미가 없음.
      const address = addresses.filter(address => {
        return address.id === addressId;
      })[0];
      if (!address) {
        return;
      }
      await AccountAPI.Address.modify({
        ...address,
        isDefault: !address.isDefault,
      });
      refetch();
    },
    [refetch],
  );

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        await signIn('guest', { redirect: false });
      }
      fetch();
    })();
  }, []);

  const props = {
    addresses: addresses,
    handleAddressDeleteButtonClick: handleAddressDeleteButtonClick,
    handleAddressDefaultCheck: handleAddressDefaultCheck,
    refetch: refetch,
  };

  return (
    <>
      <Desktop>
        <MyPageAddressPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MyPageAddressPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
