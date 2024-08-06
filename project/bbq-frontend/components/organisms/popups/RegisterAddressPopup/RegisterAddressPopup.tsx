import { useCallback, useMemo, useState } from 'react';

import { AccountAPI } from '@/apis';
import { Flex, Input, Space } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { AddressSearchForm } from '@/components/organisms';
import { Address } from '@/types';
import { parseApiError } from '@/utils';

export const RegisterAddressPopup = ({
  defaultAddress,
  refetch,
}: {
  defaultAddress?: Address;
  refetch: () => void;
}) => {
  const { closeModal } = useModal();

  const [scene, setScene] = useState<'INPUT' | 'SEARCH'>('INPUT');
  const [name, setName] = useState<string>(defaultAddress?.deliveryName ?? '');
  const [address, setAddress] = useState<string>(defaultAddress?.fullAddress ?? '');
  const [detailAddress, setDetailAddress] = useState<string>(defaultAddress?.detailAddress ?? '');

  const changed = useMemo(() => {
    return (
      (defaultAddress?.deliveryName ?? '') !== (name ?? '') ||
      (defaultAddress?.fullAddress ?? '') !== (address ?? '') ||
      (defaultAddress?.detailAddress ?? '') !== (detailAddress ?? '')
    );
  }, [defaultAddress, name, address, detailAddress]);

  const handleSubmitButtonClick = useCallback(async () => {
    try {
      if (defaultAddress) {
        await AccountAPI.Address.modify({
          id: defaultAddress.id,
          deliveryName: name,
          detailAddress: detailAddress,
          latitude: defaultAddress.latitude,
          longitude: defaultAddress.longitude,
          isDefault: defaultAddress.isDefault,
        });
      } else {
        const { latitude, longitude } =
          await AccountAPI.Address.utils.convertAddressWithCoordinates({
            address: `${address}`,
          });
        await AccountAPI.Address.add({
          deliveryName: name,
          fullAddress: address,
          detailAddress: detailAddress,
          latitude: latitude,
          longitude: longitude,
          isDefault: false,
        });
      }
      refetch();
      closeModal();
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, [name, address, detailAddress, defaultAddress]);

  return (
    <>
      {scene === 'INPUT' ? (
        <div>
          <Input
            shadow={true}
            shape={'round'}
            placeholder={'배송지명 (최대 10글자 자유롭게 수정 가능)'}
            value={name}
            onChange={e => {
              setName(e.target.value.slice(0, 10));
            }}
          />
          <Space.H3 />
          <Flex layout="7 auto 120px">
            <Input
              readonly={true}
              shadow={true}
              placeholder={'주소'}
              value={address}
              onChange={e => {}}
            />
            <Space.V2 />
            <Button
              disabled={!!defaultAddress}
              full
              fill={true}
              color="black"
              shape={'round'}
              style={{ height: 44 }}
              text={'주소 검색'}
              onClick={() => {
                setScene('SEARCH');
              }}
            />
          </Flex>
          <Space.H3 />
          <Input
            shadow={true}
            shape={'round'}
            placeholder={'상세주소'}
            value={detailAddress}
            onChange={e => {
              setDetailAddress(e.target.value);
            }}
          />
          <Space.H3 />
          <Button
            disabled={
              name.trim().length &&
              address.trim().length &&
              detailAddress.trim().length &&
              (defaultAddress ? changed : true)
                ? false
                : true
            }
            full={true}
            color={'red'}
            shape={'round'}
            text="확인"
            onClick={handleSubmitButtonClick}
          />
        </div>
      ) : null}
      {scene === 'SEARCH' ? (
        <AddressSearchForm
          handleSubmit={({ address, roadAddress, detailAddress }) => {
            setAddress(roadAddress && roadAddress.length ? roadAddress : address);
            setDetailAddress(detailAddress);
            setScene('INPUT');
          }}
        />
      ) : null}
    </>
  );
};
