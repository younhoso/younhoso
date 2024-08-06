'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { debounce } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import CartPageDivide from '@/components/CartPageDivide';
import { approvedIp } from '@/components/ProductOptionPayInfo/main/mobile/ProductOptionPayInfoMobile';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useGetRandomItemsInSections } from '@/hooks/api/useGetRandomItemsInSection';
import { useHandleCheckbox } from '@/hooks/useHandleCheckbox';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { queryClient } from '@/provider/ReactQueryProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcCartUserPageStyled } from '@/styles/pageStyled/pc/pcCartUserPageStyled';
import { Cart, CartBody, CartPrice, OrderBody } from '@/types';
import { arrangeProductList } from '@/utils/arrangeProducList';

const PcCartUser = () => {
  const { data } = useGetRandomItemsInSections();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();
  const { isSignIn } = useHandleIsSignIn();

  const {
    data: cart,
    refetch: cartRefetch,
    isPending: isCartLoading,
  } = useQuery({
    queryKey: ['/cart'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<Cart>(key, {
        params: {
          divideInvalidProducts: false,
        },
      }),
  });

  const cartList = useMemo(() => {
    return cart ? arrangeProductList(cart?.data.deliveryGroups) : [];
  }, [cart]);

  const {
    indeterminate,
    checkAll,
    onClickCheckAll,
    onChangeCheckbox,
    checkedList,
    refetch: checkboxRefetch,
  } = useHandleCheckbox(
    cartList.filter(v => v.validInfo.valid),
    true,
    isCartLoading,
  );

  const {
    data: price,
    refetch: priceRefetch,
    isFetching: isPriceLoading,
  } = useQuery({
    queryKey: ['/cart/calculate'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<CartPrice>(key, {
        params: {
          cartNo: checkedList.join(','),
          divideInvalidProducts: false,
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    if (cart) {
      if (isPriceLoading) {
        queryClient.removeQueries({ queryKey: ['/cart/calculate'] });
      }
      priceRefetch();
    }
  }, [cart, checkedList]);

  const { mutateAsync: deleteCart } = useMutation({
    mutationFn: (cartNo: string) =>
      customAxios(PLATFORMLIST.PC).delete(`/cart`, { params: { cartNo } }),
  });

  const { mutateAsync: _modifyCart } = useMutation({
    mutationFn: (cartBody: CartBody[]) =>
      customAxios(PLATFORMLIST.PC).put<unknown>('/cart', cartBody),
  });

  const { mutateAsync: order, isPending } = useMutation({
    mutationFn: (body: OrderBody) =>
      customAxios(PLATFORMLIST.PC).post<{ orderSheetNo: string }>('/order-sheets', body),
  });

  const { refetch: cartCountRefetch } = useQuery({
    queryKey: ['/cart/count'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<{ count: number }>(key),
    enabled: false,
  });

  const onClickDelete = (list: number[], noLengthWord: string, confirmWord: string) => {
    if (!list.length) {
      return setConfirmModalOpen({
        open: true,
        content: noLengthWord,
        onOk: resetOpenConfirm,
      });
    }

    try {
      setConfirmModalOpen({
        open: true,
        content: confirmWord,
        onOk: async () => {
          await deleteCart(list.join(','));
          cartRefetch();
          cartCountRefetch();
          resetOpenConfirm();
          checkboxRefetch(list);
        },
        onCancel: resetOpenConfirm,
      });
    } catch {
      setConfirmModalOpen({
        open: true,
        content: '상품 삭제에 실패하였습니다.',
        onOk: resetOpenConfirm,
      });
    }
  };

  const modifyCart = useCallback(
    debounce(
      async (e: number, i: number) => {
        const thisCart = cartList[i];
        cartList.splice(i, 1, { ...thisCart, orderCnt: e });

        await _modifyCart([{ ...thisCart, orderCnt: e }]);

        priceRefetch();
      },

      300,
    ),
    [_modifyCart, cartList],
  );

  const onClickOrder = async () => {
    const filtered = cartList.filter(v => checkedList.includes(v.cartNo));
    try {
      const res = await order({
        cartNos: filtered.map(v => v.cartNo),
        products: filtered.map(v => ({
          orderCnt: v.orderCnt,
          optionInputs: [
            {
              inputLabel: v.optionName,
              inputValue: v.optionValue,
            },
          ],
          optionNo: v.optionNo,
          productNo: v.productNo,
          rentalInfos: [],
        })),
      });
      router.push(`/order/${res.data.orderSheetNo}`);
    } catch (e: any) {
      setConfirmModalOpen({
        open: true,
        onOk: resetOpenConfirm,
        content: e.response.data.message,
      });
    }
  };

  const { data: ip } = useQuery({
    queryKey: ['/api/main/ip'],
    queryFn: async ({ queryKey: [key] }) => axios.get(key),
  });

  const visiblePay = approvedIp.includes(ip?.data);

  const { mutateAsync } = useMutation({
    mutationFn: (body: unknown) =>
      customAxios(PLATFORMLIST.PC).post<string>('/payments/naver/ordersheet', body),
  });

  const onClickNaverPay = async () => {
    const filtered = cartList.filter(v => checkedList.includes(v.cartNo));
    const items = filtered
      ? filtered?.map(item => ({
          orderCnt: item.orderCnt,
          optionInputs: [
            {
              inputLabel: item.optionName,
              inputValue: item.optionValue,
            },
          ],
          optionNo: item.optionNo,
          productNo: item.productNo,
          channelType: '',
        }))
      : [];

    await mutateAsync({
      items,
      clientReturnUrl: process.env.NEXT_PUBLIC_KCP_CONFIRM_URL + '/pc',
    });
  };

  return (
    <PcCartUserPageStyled>
      <CartPageDivide
        indeterminate={indeterminate}
        checkAll={checkAll}
        onClickCheckAll={onClickCheckAll}
        onChangeCheckbox={onChangeCheckbox}
        checkedList={checkedList}
        cartLength={cartList.length}
        data={data}
        onClickDelete={onClickDelete}
        cartList={cartList}
        modifyCart={modifyCart}
        price={price?.data}
        onClickOrder={onClickOrder}
        isCartLoading={isCartLoading}
        orderLoading={isPending}
        visiblePay={visiblePay}
        onClickNaverPay={onClickNaverPay}
      />
    </PcCartUserPageStyled>
  );
};

export default PcCartUser;
