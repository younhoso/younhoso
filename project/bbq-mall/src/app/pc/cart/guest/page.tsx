'use client';

import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { AxiosResponse } from 'axios';
import { debounce } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import CartPageDivide from '@/components/CartPageDivide';
import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import { CartLocastorage } from '@/components/ProductOptionPayInfo/main/mobile/ProductOptionPayInfoMobile';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useGetRandomItemsInSections } from '@/hooks/api/useGetRandomItemsInSection';
import { useHandleCheckbox } from '@/hooks/useHandleCheckbox';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcCartGuestPageStyled } from '@/styles/pageStyled/pc/pcCartGuestPageStyled';
import { Cart, CartPrice, OrderBody } from '@/types';
import { arrangeProductList } from '@/utils/arrangeProducList';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/localStorage';
import { syncCart } from '@/utils/syncCart';

const PcCartGuest = () => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();

  const { data } = useGetRandomItemsInSections();
  const cartLocalstorage = getLocalStorageItem<CartLocastorage[]>('cart');
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [price, setPrice] = useState<
    | AxiosResponse<
        {
          price: CartPrice;
        },
        any
      >
    | undefined
  >(undefined);

  const [cartList, setCartList] = useState<CartProductData[]>([]);

  const { mutateAsync } = useMutation({
    mutationFn: (localCart: CartLocastorage[] | CartProductData[]) =>
      customAxios(PLATFORMLIST.PC).post<Cart>('/guest/cart', localCart, {
        params: {
          divideInvalidProducts: false,
        },
      }),
  });

  const { mutateAsync: pricaeMutate } = useMutation({
    mutationFn: (localCart: CartLocastorage[] | CartProductData[]) =>
      customAxios(PLATFORMLIST.PC).post<Cart & CartPrice>('/guest/cart', localCart, {
        params: {
          divideInvalidProducts: false,
        },
      }),
  });

  useEffect(() => {
    if (cartLocalstorage) {
      (async () => {
        try {
          const cart = await mutateAsync(cartLocalstorage);
          const _cartList = arrangeProductList(cart?.data.deliveryGroups);
          const data = await pricaeMutate(_cartList.filter(v => v.validInfo.valid));

          setLocalStorageItem('cart', syncCart(_cartList));

          setCartList(_cartList);
          setPrice(data);
        } catch (e) {
          setConfirmModalOpen({
            open: true,
            content: '데이터가 존재하지 않는 상품이 삭제되었습니다.',
            onOk: () => {
              resetOpenConfirm();
              removeLocalStorageItem('cart');
            },
          });
        } finally {
          setIsFirstLoading(false);
        }
      })();
    } else {
      setIsFirstLoading(false);
    }
  }, []);

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
    isFirstLoading,
  );

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
          const excepted = (cartList ?? []).filter(v => !list.includes(v.cartNo));
          const cart = await mutateAsync(excepted);
          const _cartList = arrangeProductList(cart?.data.deliveryGroups);

          setLocalStorageItem('cart', syncCart(_cartList));

          setCartList(_cartList);

          const data = await pricaeMutate(
            syncCart(_cartList)?.filter(v => checkedList.includes(v.cartNo)) as CartLocastorage[],
          );
          setPrice(data);
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
        const thisCart: CartLocastorage | undefined = cartLocalstorage?.[i];

        if (!thisCart) {
          return;
        }

        const _cartLocalstorage = [...(cartLocalstorage ?? [])];

        _cartLocalstorage?.splice(i, 1, {
          cartNo: thisCart.cartNo,
          optionNo: thisCart.optionNo,
          orderCnt: e,
          productNo: thisCart.productNo,
          optionInputs: thisCart.optionInputs.length
            ? [
                {
                  inputLabel: thisCart.optionInputs[0].inputLabel,
                  inputValue: thisCart.optionInputs[0].inputValue,
                },
              ]
            : [],
        });

        const data = await pricaeMutate(
          _cartLocalstorage?.filter(v => checkedList.includes(v.cartNo)) as CartLocastorage[],
        );

        const cart = await mutateAsync(_cartLocalstorage);
        const _cartList = arrangeProductList(cart?.data.deliveryGroups);
        setCartList(_cartList);
        setLocalStorageItem('cart', syncCart(_cartList));

        setPrice(data);
      },

      300,
    ),
    [cartList, checkedList],
  );

  const { mutateAsync: order, isPending } = useMutation({
    mutationFn: (body: OrderBody) =>
      customAxios(PLATFORMLIST.PC).post<{ orderSheetNo: string }>('/order-sheets', body),
  });

  const onClickOrder = async () => {
    const _cartLocalstorage = [...(cartLocalstorage ?? [])];
    const removeDuplicate = _cartLocalstorage.filter(
      (v, i) =>
        _cartLocalstorage.findIndex(
          k => `${v.productNo}` + `${v.optionNo}` === `${k.productNo}` + `${k.optionNo}`,
        ) === i,
    );
    setLocalStorageItem('cart', removeDuplicate);
    const filtered = removeDuplicate.filter(v => checkedList.includes(v.cartNo));
    try {
      const res = await order({
        cartNos: filtered.map(v => v.cartNo ?? 0),
        products: filtered.map(v => ({
          orderCnt: v.orderCnt,
          optionInputs: v.optionInputs,
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

  return (
    <PcCartGuestPageStyled>
      <CartPageDivide
        isCartLoading={isFirstLoading}
        indeterminate={indeterminate}
        checkAll={checkAll}
        onClickCheckAll={async () => {
          onClickCheckAll();
          const priceData = await pricaeMutate(checkAll ? [] : cartLocalstorage ?? []);
          setPrice(priceData);
        }}
        onChangeCheckbox={async v => {
          onChangeCheckbox(v);

          const priceData = await pricaeMutate(
            checkedList.includes(v)
              ? (cartLocalstorage ?? []).filter(
                  k => k.cartNo !== v && checkedList.includes(k.cartNo),
                )
              : [
                  ...(cartLocalstorage ?? []).filter(k => checkedList.includes(k.cartNo)),
                  cartLocalstorage?.find(k => k.cartNo === v) as CartLocastorage,
                ],
          );
          setPrice(priceData);
        }}
        checkedList={checkedList}
        cartLength={cartList.length}
        data={data}
        onClickDelete={onClickDelete}
        cartList={cartList}
        modifyCart={modifyCart}
        price={price?.data.price}
        onClickOrder={onClickOrder}
        orderLoading={isPending}
      />
    </PcCartGuestPageStyled>
  );
};

export default PcCartGuest;
