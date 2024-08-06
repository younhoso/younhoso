import { getSession, signIn } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { AddressSearchPageTemplate } from '@/components/templates';
import { accountDefaultAddressState } from '@/stores';
import { parseApiError, popData } from '@/utils';

export default function AddressSearch() {
  const router = useRouter();

  const [submitted, setSubmitted] = useState<boolean>(false);

  const refreshDefaultAddressState = useRecoilRefresher_UNSTABLE(accountDefaultAddressState);
  const { state: defaultAddressState, contents: defaultAddress } = useRecoilValueLoadable(
    accountDefaultAddressState,
  );

  const [address, setAddress] = useState<string | undefined>(undefined);
  const [roadAddress, setRoadAddress] = useState<string | undefined>(undefined);
  const [detailAddress, setDetailAddress] = useState<string>('');
  const reset = useCallback(() => {
    setAddress(undefined);
    setRoadAddress(undefined);
  }, []);

  const onDeatilAddressChange = useCallback((value: string) => {
    setDetailAddress(value);
  }, []);

  const onAddressSelected = useCallback((data: any) => {
    setAddress(
      data.jibunAddress && data.jibunAddress.length ? data.jibunAddress : data.autoJibunAddress,
    );
    setRoadAddress(data.roadAddress);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!address || !detailAddress) {
      return;
    }

    try {
      const { longitude, latitude } = await AccountAPI.Address.utils.convertAddressWithCoordinates({
        address: roadAddress ?? address,
      });

      await AccountAPI.Address.add({
        deliveryName: '기본',
        fullAddress: roadAddress ?? address,
        detailAddress: detailAddress,
        latitude: latitude,
        longitude: longitude,
        isDefault: true,
      });

      refreshDefaultAddressState();
      alert('성공적으로 등록했습니다.');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(false);
      alert(parseApiError(err).message);
    }
  }, [address, roadAddress, detailAddress]);

  // 기본 주소의 정보를 반영해서 주소를 설정함
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        signIn('guest', { redirect: false });
      }
    })();

    try {
      const data = popData<{
        address: string;
        roadAddress?: string;
      }>('address/search', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });
      if (data && data.address) {
        setAddress(data.address);
      }
      if (data && data.roadAddress) {
        setRoadAddress(data.roadAddress);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // 등록 완료시 자동으로 메인으로 이동
  useEffect(() => {
    if (!router.isReady) return;
    if (submitted && defaultAddressState === 'hasValue') {
      if (defaultAddress) {
        router.replace(router.query.redirect_to ? `${router.query.redirect_to}` : '/');
      }
    }
  }, [submitted, defaultAddressState, defaultAddress, router.isReady, router.query]);

  const props = {
    reset: reset,
    onDeatilAddressChange: onDeatilAddressChange,
    onAddressSelected: onAddressSelected,
    onSubmit: onSubmit,
    address: address,
    roadAddress: roadAddress,
    detailAddress: detailAddress,
  };

  return (
    <>
      <Desktop>
        <AddressSearchPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <AddressSearchPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
