'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Loading from '@/components/Loading';
import { CartLocastorage } from '@/components/ProductOptionPayInfo/main/mobile/ProductOptionPayInfoMobile';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { OrderSheet } from '@/types';
import { arrangeProductList } from '@/utils/arrangeProducList';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';
import { GUEST_TOKEN, setSessionStorageItem } from '@/utils/sessionStorage';

export default function MobileOrder() {
  const setConfirModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();
  const search = useSearchParams();
  const orderSheetNo = search.get('orderSheetNo');
  const orderNumber = search.get('orderNo');
  const result = search.get('result') as 'SUCCESS' | 'FAIL' | '2222';
  const message = search.get('message');
  const guestToken = search.get(GUEST_TOKEN);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderSheetNo) {
      return;
    }
    if (result && result !== 'SUCCESS') {
      setConfirModalOpen({
        open: true,
        content: `주문서가 초기화되었습니다. 다시 작성해주세요 ${
          message && '\n 사유:' + decodeURIComponent(message)
        }`,
        onOk: resetConfirmModalOpen,
      });

      router.replace(`/mobile/order/${orderSheetNo}`);
      return;
    }

    if (guestToken) {
      setSessionStorageItem(GUEST_TOKEN, guestToken);
      (async () => {
        const res = await queryClient.fetchQuery({
          queryKey: [`/order-sheets/${orderSheetNo}`],
          queryFn: ({ queryKey: [key] }) =>
            customAxios(PLATFORMLIST.MOBILE_WEB).get<OrderSheet>(key),
        });
        const data = arrangeProductList(res.data.deliveryGroups);
        const cart = [...(getLocalStorageItem<CartLocastorage[]>('cart') ?? [])];
        const filtered = cart.filter(
          v =>
            !data.some(
              k => `${k.productNo}` + `${k.optionNo}` === `${v.productNo}` + `${v.optionNo}`,
            ),
        );

        setLocalStorageItem('cart', filtered);
      })();
    }
    router.replace(`/mobile/order/success/${orderNumber}`);
  }, []);

  return <Loading.Mobile />;
}
