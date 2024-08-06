'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { useRouter, useSearchParams } from 'next/navigation';

import { pick } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  NO,
  YES,
  defaultCreateAddressData,
} from '@/components/AddressAddModal/main/pc/AddressAddModal';
import AddressEdit from '@/components/AddressEdit';
import Button from '@/components/Button';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyAddressEditLayoutStyled } from '@/styles/pageStyled/mobile/mobileMyAddressEditLayoutStyled';
import { AddAddressBody, Address, AddressList } from '@/types';
import { RequiredProperty } from '@/types/RequiredProperty';
import { phoneNumberRegex } from '@/utils/changedToPhoneNumberRegex';

interface CreateAddressForm {
  receiverAddress: string | null;
  receiverDetailAddress: string | null;
  receiverName: string | null;
  receiverContact1: string | null;
  defaultYn: typeof YES | typeof NO;
}

export default function MobileMyAddressEditLayout() {
  const search = useSearchParams();
  const addressNo = search.get('address_no') as unknown as number;
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();

  const { data, refetch } = useQuery({
    queryKey: ['/profile/shipping-addresses'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.MOBILE_WEB).get<AddressList>(key),
  });

  const defaultData = data?.data.bookedAddresses.find(d => d.addressNo === Number(addressNo));

  const { mutateAsync: create } = useMutation({
    mutationFn: (body: AddAddressBody) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post<unknown>('/profile/shipping-addresses', body),
  });

  const { mutateAsync: modify } = useMutation({
    mutationFn: ({ addressNumber, body }: { addressNumber: number; body: Address }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).put(
        `/profile/shipping-addresses/${addressNumber}`,
        body,
      ),
  });
  const { mutateAsync: deleteAddress } = useMutation({
    mutationFn: (addressNumber: number) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).delete(`/profile/shipping-addresses/${addressNumber}`),
  });

  return (
    <MobileMyAddressEditLayoutStyled>
      <AddressEdit.Mobile
        onSubmit={async data => {
          if (Object.values(pick(data, ['receiverName', 'receiverContact1'])).some(v => !v)) {
            return setConfirModalOpen({
              open: true,
              content: '받는 분과 연락처를 입력해주세요.',
              onOk: resetConfirmModalOpen,
            });
          }

          if (data.receiverContact1 && !phoneNumberRegex.test(data.receiverContact1)) {
            return setConfirModalOpen({
              open: true,
              content: '핸드폰 번호는 010-0000-0000의 형식으로 작성해주세요.',
              onOk: resetConfirmModalOpen,
            });
          }

          if (addressNo) {
            modify({
              addressNumber: addressNo,
              body: {
                ...(defaultData as Address),
                ...(data as RequiredProperty<CreateAddressForm>),
              },
            });
          } else {
            const receiverZipCd = search.get('receiver_zip_cd') as string;
            const receiverJibunAddress = search.get('receiver_jibun_address') as string;
            if (!receiverZipCd || !receiverJibunAddress) {
              return setConfirModalOpen({
                open: true,
                content: '오류가 발생했습니다. 다시 진행해주세요.',
                onOk: () => {
                  router.replace('/my/address/search');
                  resetConfirmModalOpen();
                },
              });
            }

            await create({
              ...(data as RequiredProperty<CreateAddressForm>),
              receiverZipCd,
              receiverJibunAddress,
              ...defaultCreateAddressData,
            });
          }
          await refetch();
          router.replace('/my/address');
        }}
        defaultValues={{
          receiverAddress: search.get('receiver_address'),
          receiverDetailAddress: search.get('receiver_detail_address'),
          receiverName: search.get('receiver_name'),
          receiverContact1: search.get('receiver_contact'),
          defaultYn: (search.get('default_yn') as typeof YES | typeof NO) ?? NO,
        }}
        addressButtonWrapper={
          <>
            {addressNo ? (
              <>
                <Button
                  size="small"
                  type="button"
                  onClick={async () => {
                    const nearItem = data?.data.bookedAddresses.find(v => v.defaultYn === NO);
                    const defaultDataYn = defaultData?.defaultYn ?? NO;
                    if (defaultDataYn === YES) {
                      if (nearItem) {
                        await modify({
                          addressNumber: nearItem.addressNo,
                          body: { ...nearItem, defaultYn: YES },
                        });
                      } else {
                        await modify({
                          addressNumber: addressNo,
                          body: { ...(defaultData as any), defaultYn: NO },
                        });
                      }
                    }
                    await deleteAddress(addressNo);
                    refetch();
                    router.replace('/my/address');
                  }}
                >
                  삭제
                </Button>
                <Button size="small" styleType="main" className="full-width" type="submit">
                  저장
                </Button>
              </>
            ) : (
              <Button size="small" styleType="main" className="full-width" type="submit">
                + 새 배송지 추가
              </Button>
            )}
          </>
        }
      />
    </MobileMyAddressEditLayoutStyled>
  );
}
