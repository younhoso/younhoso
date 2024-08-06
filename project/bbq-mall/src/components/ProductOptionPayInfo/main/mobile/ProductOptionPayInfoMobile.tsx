'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import npayBuy from '@/assets/images/components/npay-buy.svg';
import npay from '@/assets/images/components/npay.png';
import cartIcon from '@/assets/images/detail/cart.svg';
import saveOff from '@/assets/images/detail/saveOff.svg';
import saveOn from '@/assets/images/detail/saveOn.svg';
import Button from '@/components/Button';
import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import OptionChangeBox from '@/components/OptionChangeBox';
import OptionCombination from '@/components/OptionCombination';
import OptionDefault from '@/components/OptionDefault';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { COMBINATION, DEFAULT, modalOpenMessege } from '@/constant/categoryDetailRelated';
import { useAddCart } from '@/hooks/useAddCart';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { comma } from '@/utils/regExp';
import { selectClose } from '@/utils/selectClose';

import { CartMutateBody, ProductOptionPayInfoProps } from '../pc/ProductOptionPayInfo';
import { ProductOptionPayInfoMobileStyled } from './styled';

export interface CartLocastorage {
  cartNo?: number;
  productNo: number | null;
  orderCnt: number;
  optionInputs: {
    inputValue: string;
    inputLabel: string;
  }[];
  optionNo: number;
}
[];

export const removeDuplicateCart = (original: CartProductData[], newItems: CartMutateBody[]) =>
  original.filter(v =>
    newItems.some(k => `${k.productNo}` + `${k.optionNo}` === `${v.productNo}` + `${v.optionNo}`),
  );

export const isCartDuplicated = (original: CartProductData[], newItems: CartMutateBody[]) =>
  newItems.every(v =>
    original.some(
      k =>
        `${k.productNo}` + `${k.optionNo}` + `${k.orderCnt}` ===
        `${v.productNo}` + `${v.optionNo}` + `${v.orderCnt}`,
    ),
  );

export const approvedIp = [
  '::1',
  '106.248.198.2',
  '211.249.71.217',
  '103.243.200.93',
  '10.77.236.101',
  '103.243.200.91 ',
  '211.249.71.217',
  '103.243.200.92',
];

const ProductOptionPayInfoMobile = ({
  className,
  data,
  slug,
  orderSheetNoMutate,
  productData,
  likeMutate,
  orderSheetPending,
}: ProductOptionPayInfoProps) => {
  const [clicked, setClicked] = useState(productData.liked);
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
  const { addCart: onClickCart } = useAddCart(PLATFORMLIST.MOBILE_WEB);

  const [open, setOpen] = useState(false);
  const touchRef = useHandleClickOutside<HTMLDivElement>(() => setOpen(false));
  const closeRef = useRef<HTMLDivElement>(null);

  const totalPrice = selected?.reduce((sum, v) => {
    return sum + v.buyPrice * v.orderCnt;
  }, 0);

  const { mutateAsync } = useMutation({
    mutationFn: (body: unknown) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post<string>('/payments/naver/ordersheet', body),
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

  useEffect(() => {
    const close = closeRef.current;
    const touch = touchRef.current;

    if (close && touch) {
      const { touchStart, touchMove, touchEnd } = selectClose(touch, () => setOpen(false));
      close.addEventListener('touchstart', touchStart);
      close.addEventListener('touchmove', touchMove);
      close.addEventListener('touchend', touchEnd);
      return () => {
        close.removeEventListener('touchstart', touchStart);
        close.removeEventListener('touchmove', touchMove);
        close.removeEventListener('touchend', touchEnd);
      };
    }
  }, [open]);

  useEffect(() => {
    if (open && touchRef.current) {
      document.body.style.overflow = 'hidden';
      touchRef.current.style.transform = `translateY(0)`;
    } else {
      document.body.style.overflow = 'auto';
      touchRef.current && (touchRef.current.style.transform = `translateY(70vh)`);
    }
  }, [open]);

  return (
    <ProductOptionPayInfoMobileStyled
      className={clsx('ProductOptionPayInfoMobile', className, open && 'active')}
    >
      <div className={clsx('footer-price-inner', open && 'active')} ref={touchRef}>
        <div className="close-el" ref={closeRef}>
          <div className="close"></div>
        </div>
        <div className="option-inner">
          <div>
            {data?.type === COMBINATION && (
              <>
                <OptionChangeBox.Mobile
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
                <OptionCombination.Mobile
                  data={data}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {data?.type === DEFAULT && (
              <OptionDefault.Mobile selected={selected} setSelected={setSelected} data={data} />
            )}
          </div>
        </div>
        <div className="price-inner">
          <p>총 상품금액</p>
          <p className="price">{comma(totalPrice!) + ' 원'}</p>
        </div>
        {isSignIn ? (
          <div className="point-text-inner">
            <p className="title">
              적립예정 포인트 : 결제금액 {productData.price.accumulationRate}%
            </p>
            <p className="desc">* 일부품목 제외</p>
          </div>
        ) : (
          <div className="point-text-inner">
            <p className="title">로그인 후, 적립 혜택 제공</p>
          </div>
        )}
        <div className="pay-button">
          {/* <button>네이버 페이</button> */}
          <button
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
            <Image src={cartIcon} alt="cart-icon" width={32} height={32} />
          </button>
          <Button
            styleType="main"
            disabled={productData.status.soldout || orderSheetPending}
            isLoading={orderSheetPending}
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
                  content: modalOpenMessege.messageOrderSelcet,
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
                  content: modalOpenMessege.messageOrderSelcet,
                  onOk: resetOpenConfirm,
                });
              }

              const { data } = await mutateAsync({
                items,
                clientReturnUrl: process.env.NEXT_PUBLIC_KCP_CONFIRM_URL + '/mobile',
              });
              router.push(data);
            }}
          >
            <Image src={npay} width={51} height={20} alt="npay" />
            <Image src={npayBuy} width={26} height={14} alt="buy" />
          </Button>
        )}
      </div>
      <div className="button-inner">
        <button
          onClick={async () => {
            if (!isSignIn) {
              return setConfirmModalOpen({
                open: true,
                content: modalOpenMessege.messageLogin,
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
          <Image src={clicked ? saveOn : saveOff} alt="save-icon" width={32} height={32} />
        </button>
        <Button
          disabled={productData?.status.soldout}
          styleType="main"
          onClick={e => {
            setOpen(!open);

            if (touchRef.current) {
              touchRef.current.style.transform = `translateY(0)`;
            }
          }}
        >
          구매하기
        </Button>
      </div>
    </ProductOptionPayInfoMobileStyled>
  );
};

export default ProductOptionPayInfoMobile;
