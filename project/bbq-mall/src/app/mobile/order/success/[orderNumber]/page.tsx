'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import ContentBox from '@/components/ContentBox';
import Divider from '@/components/Divider';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { theme } from '@/provider/CustomThemeProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileOrderSuccessPageStyled } from '@/styles/pageStyled/mobile/mobileOrderSuccessPageStyled';
import { OrderHistoryDetail, OrderHistoryStatusItem } from '@/types/orderHistoryRelated';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

const MobileOrderSuccess = ({ params: { orderNumber } }: { params: { orderNumber: string } }) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const router = useRouter();
  const { data, isPending, refetch, error } = useQuery({
    queryKey: [`/profile/orders/${orderNumber}`],
    queryFn: ({ queryKey: [key] }) => {
      if (isSignIn) {
        return customAxios(PLATFORMLIST.MOBILE_WEB).get<OrderHistoryDetail>(key);
      }

      const guestToken = getSessionStorageItem<string>(GUEST_TOKEN);
      if (!guestToken) {
        throw {
          response: { data: { message: '토큰이 만료되었습니다. 다시 입력해주세요' } },
        };
      }

      return customAxios(PLATFORMLIST.MOBILE_WEB).get<OrderHistoryDetail>(
        `/guest/orders/${orderNumber}`,
        {
          headers: {
            guestToken,
          },
        },
      );
    },
    enabled: false,
  });

  const { refetch: cartRefetch } = useQuery({
    queryKey: ['/cart/count'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<{ count: number }>(key),
    enabled: false,
  });

  useEffect(() => {
    if (isSignIn) {
      cartRefetch();
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading]);

  if (error) {
    setConfirmModalOpen({
      content: (error as any).response.data.message,
      open: true,
      onOk: () => {
        resetOpenConfirm();
        router.replace('/');
      },
    });
    return <Loading.Mobile />;
  }

  const discountList = [
    { label: '상품할인금액', value: data?.data.lastOrderAmount.immediateDiscountAmt },
    { label: '주문 쿠폰 할인', value: data?.data.lastOrderAmount.cartCouponDiscountAmt },
    { label: '상품 쿠폰 할인', value: data?.data.lastOrderAmount.productCouponDiscountAmt },
    { label: '포인트 할인', value: data?.data.lastOrderAmount.subPayAmt },
  ];

  return (
    <>
      <Header.Mobile title="주문완료" />
      <Divider.Mobile />
      <MobileOrderSuccessPageStyled>
        <div className="order-success-header">
          <h2>주문이 완료되었습니다.</h2>
          <h3>
            주문번호 <span>{orderNumber}</span>
          </h3>
        </div>
        {isPending ? (
          <Loading.Mobile />
        ) : (
          <>
            <Divider.Mobile />
            <ContentBox.Mobile title="주문상품">
              <div className="content-item-wrapper">
                {data?.data.orderOptionsGroupByPartner.map(v =>
                  v.orderOptionsGroupByDelivery.map(k =>
                    k.orderOptions.map(j => (
                      <div key={j.optionNo}>
                        <div className="order-item-info">
                          <Image src={'https:' + j.imageUrl} width={72} height={72} alt="image" />
                          <div>
                            <p onClick={() => router.push(`/categories/detail/${j.productNo}`)}>
                              {j.productName}
                            </p>
                            <div>
                              {j.price.buyAmt.toLocaleString()}원
                              <span>
                                <span> | </span>
                                {j.orderCnt.toLocaleString()}개
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )),
                  ),
                )}
              </div>
              <Divider />
              <div className="order-content-button-wrapper">
                <Button
                  size="small"
                  onClick={() =>
                    router.push(
                      isSignIn
                        ? `/my/order-history/detail/${orderNumber}/completed`
                        : `/order/check/guest/detail/${orderNumber}`,
                    )
                  }
                >
                  주문/ 배송 조회
                </Button>
                <Button size="small" styleType="main" onClick={() => router.push('/')}>
                  계속 쇼핑하기
                </Button>
              </div>
            </ContentBox.Mobile>
            <Divider.Mobile />
            <ContentBox.Mobile title="결제정보">
              <OrderContentItem.Mobile title="결제방법">
                {data?.data.payTypeLabel}
              </OrderContentItem.Mobile>

              <OrderContentItem.Mobile title="주문상태">
                {OrderHistoryStatusItem[data?.data.defaultOrderStatusType].label}
              </OrderContentItem.Mobile>

              <OrderContentItem.Mobile title="결제일시">
                {dayjs(new Date(data?.data.orderYmdt ?? '')).format('YYYY.MM.DD HH:mm:ss')}
              </OrderContentItem.Mobile>

              {data?.data.defaultOrderStatusType === 'DEPOSIT_WAIT' && (
                <>
                  <OrderContentItem.Mobile title="입금계좌">
                    {data?.data.payInfo.bankInfo.bankName} {data?.data.payInfo.bankInfo.account}{' '}
                    (예금주: {data?.data.payInfo.bankInfo.depositorName})
                  </OrderContentItem.Mobile>
                  <OrderContentItem.Mobile title="입금기간">
                    {dayjs(data?.data.paymentExpirationYmdt).format('YYYY년 MM월 DD일 HH:mm 까지')}{' '}
                    (입금되지 않았을 경우 자동으로 주문무효 처리)
                  </OrderContentItem.Mobile>
                </>
              )}

              <OrderContentItem.Mobile title="상품금액">
                {data?.data.lastOrderAmount.standardAmt.toLocaleString()} 원
              </OrderContentItem.Mobile>

              <OrderContentItem.Mobile title="할인금액">
                <span className="discount-sum">
                  {discountList
                    .reduce((acc, cur) => {
                      return acc + (cur.value ?? 0);
                    }, 0)
                    .toLocaleString()}{' '}
                </span>
                원
              </OrderContentItem.Mobile>

              {discountList
                .filter(v => v.value)
                .map(v => (
                  <div key={v.label} className="discount-list">
                    - {v.label}
                    <span>- {v.value?.toLocaleString()} 원</span>
                  </div>
                ))}
              <OrderContentItem.Mobile title="배송비">
                {data?.data.lastOrderAmount.deliveryAmt.toLocaleString()} 원
              </OrderContentItem.Mobile>

              <Divider marginBottom="16px" marginTop="16px" borderColor={theme.colors.grayaea} />
              <OrderContentItem.Mobile title="결제금액">
                <span className="discount-sum">
                  {data?.data.lastOrderAmount.chargeAmt.toLocaleString()}
                </span>{' '}
                원
              </OrderContentItem.Mobile>
            </ContentBox.Mobile>
            <Divider.Mobile />
            <ContentBox.Mobile title="배송정보">
              <OrderContentItem.Mobile title="받는분">
                {data?.data.shippingAddress.receiverName}
              </OrderContentItem.Mobile>
              <OrderContentItem.Mobile title="휴대폰">
                {data?.data.shippingAddress.receiverContact1}
              </OrderContentItem.Mobile>
              <OrderContentItem.Mobile title="배송국가">
                {data?.data.shippingAddress.countryCd}
              </OrderContentItem.Mobile>
              <OrderContentItem.Mobile title="배송지">
                {data?.data.shippingAddress.receiverAddress +
                  ' ' +
                  data?.data.shippingAddress.receiverDetailAddress}
              </OrderContentItem.Mobile>
            </ContentBox.Mobile>
          </>
        )}
      </MobileOrderSuccessPageStyled>
    </>
  );
};

export default MobileOrderSuccess;
