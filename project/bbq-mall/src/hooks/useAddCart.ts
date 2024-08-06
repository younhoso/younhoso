import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import { ConfirmModalProps } from '@/components/ConfirmModal/main/pc/ConfirmModal';
import {
  CartLocastorage,
  isCartDuplicated,
  removeDuplicateCart,
} from '@/components/ProductOptionPayInfo/main/mobile/ProductOptionPayInfoMobile';
import { CartMutateBody } from '@/components/ProductOptionPayInfo/main/pc/ProductOptionPayInfo';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { Platform, customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Cart } from '@/types';
import { arrangeProductList } from '@/utils/arrangeProducList';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/localStorage';

import { useHandleIsSignIn } from './useHandleIsSignIn';

export const useAddCart = (platform: Platform, showModal: boolean = true) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isSignIn } = useHandleIsSignIn();
  const _setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const setConfirmModalOpen = (props: ConfirmModalProps) => {
    if (!showModal) {
      return;
    }

    _setConfirmModalOpen(props);
  };

  const { data: cart, refetch } = useQuery({
    queryKey: ['/cart'],
    queryFn: ({ queryKey: [key] }) => customAxios(platform).get<Cart>(key),
    enabled: false,
  });

  const { refetch: cartRefetch } = useQuery({
    queryKey: ['/cart/count'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<{ count: number }>(key),
    enabled: false,
  });

  const { mutateAsync: deleteCart } = useMutation({
    mutationFn: (body: number[]) =>
      customAxios(platform).delete('/cart', { params: { cartNo: body.join(',') } }),
  });

  const { mutateAsync: createCart } = useMutation({
    mutationFn: async (body: CartMutateBody[]) =>
      customAxios(platform).post<{ count: number }>(`/cart`, body),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (localCart: CartLocastorage[] | CartProductData[]) =>
      customAxios(PLATFORMLIST.PC).post<Cart>('/guest/cart', localCart),
  });

  useEffect(() => {
    if (isSignIn) {
      refetch();
    }
  }, [isSignIn]);

  const addCart = async (selected: CartMutateBody[]) => {
    if (!selected.length) {
      return setConfirmModalOpen({
        open: true,
        content: modalOpenMessege.messageOrderSelcet,
        onOk: resetOpenConfirm,
      });
    }
    setIsLoading(true);

    if (isSignIn) {
      const original = arrangeProductList(cart?.data.deliveryGroups!);
      if (isCartDuplicated(original, selected)) {
        setIsLoading(false);
        return setConfirmModalOpen({
          content: '해당 상품은 이미 장바구니에 담겨있습니다.\n장바구니로 이동하시겠습니까?',
          open: true,
          onOk: () => {
            resetOpenConfirm();
            router.push('/cart');
          },
          onCancel: resetOpenConfirm,
        });
      }

      try {
        const removeNedeed = removeDuplicateCart(original, selected);
        if (removeNedeed.length) {
          await deleteCart(removeNedeed.map(v => v.cartNo));
        }
        await createCart(selected);
        await cartRefetch();
        await refetch();
      } catch (e: any) {
        return setConfirmModalOpen({
          content: e.response.data.message,
          open: true,
          onOk: resetOpenConfirm,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      const cartLocalstorage = getLocalStorageItem<CartLocastorage[]>('cart');
      const _cart = await mutateAsync(cartLocalstorage ?? []);
      const original = arrangeProductList(_cart?.data.deliveryGroups);
      const invalid = arrangeProductList(
        _cart?.data.invalidProducts.map(v => ({ orderProducts: [v] })) as any,
      );
      setIsLoading(false);
      const filtered = invalid.filter(v =>
        selected.some(
          k => `${k.productNo}` + `${k.optionNo}` === `${v.productNo}` + `${v.optionNo}`,
        ),
      );

      if (filtered.length) {
        return setConfirmModalOpen({
          content:
            '아래 옵션을 장바구니에 추가할 수 없습니다.\n' +
            filtered.map(v => `${v.optionValue}: ${v.validInfo.message}\n`),
          onOk: resetOpenConfirm,
          open: true,
        });
      }
      if (isCartDuplicated(original, selected)) {
        return setConfirmModalOpen({
          content: '해당 상품은 이미 장바구니에 담겨있습니다.\n장바구니로 이동하시겠습니까?',
          open: true,
          onOk: () => {
            resetOpenConfirm();
            router.push('/cart');
          },
          onCancel: resetOpenConfirm,
        });
      }

      const removeNedeed = removeDuplicateCart(original, selected);

      setLocalStorageItem('cart', [
        ...(cartLocalstorage?.filter(v => !removeNedeed.some(k => k.cartNo === v.cartNo)) ?? []),
        ...selected.map(k => ({
          ...k,
          cartNo: Number(`${new Date().getTime()}`.slice(-8)) + k.optionNo,
        })),
      ]);
    }

    setConfirmModalOpen({
      open: true,
      content: '장바구니에 상품이 담겼습니다.\n장바구니로 이동하시겠습니까?',
      onOk: () => {
        resetOpenConfirm();
        router.push('/cart');
      },
      onCancel: resetOpenConfirm,
    });
  };

  return { addCart, isLoading };
};
