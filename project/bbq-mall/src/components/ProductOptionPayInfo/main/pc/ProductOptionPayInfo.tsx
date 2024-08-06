'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import npayBuy from '@/assets/images/components/npay-buy.svg';
import npay from '@/assets/images/components/npay.png';
import cartWhtieIcon from '@/assets/images/detail/cart-white.svg';
import cartIcon from '@/assets/images/detail/cart.svg';
import saveOff from '@/assets/images/detail/saveOff.svg';
import saveOn from '@/assets/images/detail/saveOn.svg';
import Button from '@/components/Button';
import OptionChangeBox from '@/components/OptionChangeBox';
import OptionCombination from '@/components/OptionCombination';
import OptionDefault from '@/components/OptionDefault';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { COMBINATION, DEFAULT } from '@/constant/categoryDetailRelated';
import { useAddCart } from '@/hooks/useAddCart';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { CombinedProduct } from '@/types/productDetail';
import { CombinedProductOption } from '@/types/productOption';
import { comma } from '@/utils/regExp';

import { approvedIp } from '../mobile/ProductOptionPayInfoMobile';
import { ProductOptionPayInfoStyled } from './styled';

export interface CartMutateBody {
  productNo: number;
  optionNo: number;
  orderCnt: number;
  optionInputs: {
    inputLabel: string;
    inputValue: string;
  }[];
}

export interface ProductOptionPayInfoProps {
  className?: string;
  data: CombinedProductOption | undefined;
  productData: CombinedProduct;
  slug: string;
  orderSheetNoMutate: (body: {
    channelType: string;
    productCoupons: any[];
    products: { productNo: number; optionNo: number; orderCnt: number; optionInputs: any[] }[];
    trackingKey: string;
  }) => Promise<any>;
  likeMutate: (body: { productNos: number[] }) => Promise<unknown>;
  orderSheetPending: boolean | undefined;
}

const ProductOptionPayInfo = ({
  className,
  data,
  slug,
  orderSheetNoMutate,
  likeMutate,
  productData,
  orderSheetPending,
}: ProductOptionPayInfoProps) => {
  const [selected, setSelected] = useState<
    {
      key: string;
      value: string;
      productNo: number;
      optionNo: number;
      orderCnt: number;
      buyPrice: number;
    }[]
  >([]);
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn } = useHandleIsSignIn();
  const router = useRouter();
  const [clicked, setClicked] = useState(productData.liked);
  const { addCart: onClickCart } = useAddCart(PLATFORMLIST.PC);

  const totalPrice = selected?.reduce((sum, v) => {
    return sum + v.buyPrice * v.orderCnt;
  }, 0);

  const { mutateAsync } = useMutation({
    mutationFn: (body: unknown) =>
      customAxios(PLATFORMLIST.PC).post<string>('/payments/naver/ordersheet', body),
  });

  const { data: ip } = useQuery({
    queryKey: ['/api/main/ip'],
    queryFn: async ({ queryKey: [key] }) => axios.get(key),
  });

  const visiblePay = approvedIp.includes(ip?.data);

  useEffect(() => {
    if (data?.type === DEFAULT) {
      const newItems = data.multiLevelOptions.map(item => ({
        key: item.label,
        value: item.value || item.label,
        productNo: Number(slug),
        optionNo: item.optionNo,
        orderCnt: 1,
        buyPrice: item.buyPrice,
      }));

      setSelected(prevSelected => {
        const newSelected = [...prevSelected];
        newItems.forEach(newItem => {
          if (!newSelected.some(selectedItem => selectedItem.key === newItem.key)) {
            newSelected.push(newItem);
          }
        });
        return newSelected;
      });
    }
    return () => {
      setSelected([]);
    };
  }, [data]);

  return (
    <ProductOptionPayInfoStyled className={clsx('ProductOptionPayInfo', className)}>
      <div className="option-inner">
        <div>상품 선택</div>
        <div>
          {data?.type === COMBINATION && (
            <>
              <OptionChangeBox
                slug={slug}
                data={data}
                onChange={data =>
                  setSelected(prevSelected => {
                    const alreadyExists = prevSelected.some(item => item.value === data.value);

                    if (alreadyExists) {
                      return prevSelected;
                    }

                    return [...prevSelected, data];
                  })
                }
              />
              <OptionCombination data={data} selected={selected} setSelected={setSelected} />
            </>
          )}

          {data?.type === DEFAULT && (
            <OptionDefault selected={selected} setSelected={setSelected} data={data} />
          )}
        </div>
      </div>
      <div className="price-inner">
        <p>총 상품금액</p>
        <p className="price">{comma(totalPrice!) + ' 원'}</p>
      </div>

      {isSignIn ? (
        <div className="point-text-inner">
          <p className="title">적립예정 포인트 : 결제금액 {productData.price.accumulationRate}%</p>
          <p className="desc">* 일부품목 제외</p>
        </div>
      ) : (
        <div className="point-text-inner">
          <p className="title">로그인 후, 적립 혜택 제공</p>
        </div>
      )}

      <div className="button-inner">
        <button
          onClick={async () => {
            if (!isSignIn) {
              return setConfirmModalOpen({
                open: true,
                content: '로그인하셔야 본 서비스를 이용하실수 있습니다.',
                onOk: resetOpenConfirm,
              });
            }

            await likeMutate({ productNos: [productData.baseInfo.productNo] });
            setClicked(!clicked);

            setConfirmModalOpen({
              open: true,
              content: !clicked
                ? '관심상품에 추가되었습니다. \n 확인하시겠습니까?'
                : '관심상품에서 삭제되었습니다.',
              ...(!clicked && { onCancel: resetOpenConfirm }),
              onOk: () => {
                resetOpenConfirm();
                !clicked && router.push('/my/like');
              },
            });
          }}
        >
          <Image src={clicked ? saveOn : saveOff} alt="save-icon" width={36} height={36} />
        </button>
        <Button
          disabled={productData.status.soldout}
          onClick={() =>
            onClickCart(
              selected
                ? selected?.map(item => ({
                    productNo: item.productNo,
                    optionNo: item.optionNo,
                    orderCnt: item.orderCnt,
                    optionInputs: [],
                  }))
                : [],
            )
          }
        >
          <Image
            src={productData.status.soldout ? cartWhtieIcon : cartIcon}
            alt="cart-icon"
            width={36}
            height={36}
          />
        </Button>
        <Button
          disabled={productData.status.soldout || orderSheetPending}
          isLoading={orderSheetPending}
          styleType="main"
          onClick={async () => {
            const products = selected
              ? selected?.map(item => ({
                  productNo: item.productNo,
                  optionNo: item.optionNo,
                  orderCnt: item.orderCnt,
                  optionInputs: [],
                }))
              : [];

            if (!products.length) {
              return setConfirmModalOpen({
                open: true,
                content: '주문하실 상품을 선택해주세요.',
                onOk: resetOpenConfirm,
              });
            }

            try {
              const { data: orderSheet } = await orderSheetNoMutate({
                channelType: '',
                productCoupons: [],
                products: products,
                trackingKey: '',
              });
              router.push(`/order/${orderSheet.orderSheetNo}`);
            } catch (e: any) {
              setConfirmModalOpen({
                open: true,
                onOk: resetOpenConfirm,
                content: e.response.data.message,
              });
            }
          }}
        >
          바로구매
        </Button>
      </div>
      {visiblePay && (
        <Button
          className="npay"
          fullWidth
          onClick={async () => {
            const items = selected
              ? selected?.map(item => ({
                  productNo: item.productNo,
                  optionNo: item.optionNo,
                  orderCnt: item.orderCnt,
                  optionInputs: [],
                  channelType: '',
                }))
              : [];

            if (!items.length) {
              return setConfirmModalOpen({
                open: true,
                content: '주문하실 상품을 선택해주세요.',
                onOk: resetOpenConfirm,
              });
            }

            const { data } = await mutateAsync({
              items,
              clientReturnUrl: process.env.NEXT_PUBLIC_KCP_CONFIRM_URL + '/pc',
            });

            router.push(data);
          }}
        >
          <Image src={npay} width={72} height={28} alt="npay" />
          <Image src={npayBuy} width={37} height={20} alt="buy" />
        </Button>
      )}
    </ProductOptionPayInfoStyled>
  );
};

export default ProductOptionPayInfo;
