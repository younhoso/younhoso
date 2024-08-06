'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import orderSuccess from '@/assets/images/order/order-success.svg';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import OrderContentTemplate from '@/components/OrderContentTemplate';
import OrderSuccessItem from '@/components/OrderSuccessItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcOrderSuccessPageStyled } from '@/styles/pageStyled/pc/pcOrderSuccessPageStyled';
import { OrderHistoryDetail, OrderHistoryStatusItem } from '@/types/orderHistoryRelated';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

const PcOrderSuccess = ({ params: { orderNumber } }: { params: { orderNumber: string } }) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const router = useRouter();
  const { data, isPending, refetch, error } = useQuery({
    queryKey: [`/profile/orders/${orderNumber}`],
    queryFn: ({ queryKey: [key] }) => {
      if (isSignIn) {
        return customAxios(PLATFORMLIST.PC).get<OrderHistoryDetail>(key);
      }

      const guestToken = getSessionStorageItem<string>(GUEST_TOKEN);
      if (!guestToken) {
        throw {
          response: { data: { message: '토큰이 만료되었습니다. 다시 입력해주세요' } },
        };
      }

      return customAxios(PLATFORMLIST.PC).get<OrderHistoryDetail>(`/guest/orders/${orderNumber}`, {
        headers: {
          guestToken,
        },
      });
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
    return <Loading />;
  }

  const discountList = [
    { label: '상품할인금액', value: data?.data.lastOrderAmount.immediateDiscountAmt },
    { label: '주문 쿠폰 할인', value: data?.data.lastOrderAmount.cartCouponDiscountAmt },
    { label: '상품 쿠폰 할인', value: data?.data.lastOrderAmount.productCouponDiscountAmt },
    { label: '포인트 할인', value: data?.data.lastOrderAmount.subPayAmt },
  ];

  return (
    <PcOrderSuccessPageStyled>
      <div className="order-success-header">
        <Image src={orderSuccess} width={48} height={48} alt="order-success" />
        <h2>주문이 완료되었습니다.</h2>
        <h3>
          주문번호 <span>{orderNumber}</span>
        </h3>
      </div>
      <div className="order-success-content-wrapper">
        {isPending ? (
          <Loading differ="228px" />
        ) : (
          <>
            <OrderContentTemplate label="주문상품">
              <div className="content-item-list">
                {data?.data.orderOptionsGroupByPartner.map(v =>
                  v.orderOptionsGroupByDelivery.map(k =>
                    k.orderOptions.map(j => (
                      <div key={j.optionNo}>
                        <div className="product-label-title">
                          <Image src={'https:' + j.imageUrl} width={80} height={80} alt="image" />
                          <div>
                            <p onClick={() => router.push(`/categories/detail/${j.productNo}`)}>
                              {j.productName}
                            </p>
                            <p>{j.optionValue}</p>
                          </div>
                        </div>
                        <div>{j.orderCnt.toLocaleString()}개</div>
                        <div>{j.price.buyAmt.toLocaleString()}원</div>
                      </div>
                    )),
                  ),
                )}
              </div>
            </OrderContentTemplate>

            <OrderContentTemplate label="결제정보">
              <OrderSuccessItem label="결제방법">{data?.data.payTypeLabel}</OrderSuccessItem>

              <OrderSuccessItem label="주문상태">
                {OrderHistoryStatusItem[data?.data.defaultOrderStatusType].label}
              </OrderSuccessItem>
              <OrderSuccessItem label="주문접수일시">
                {dayjs(new Date(data?.data.orderYmdt ?? '')).format('YYYY.MM.DD HH:mm:ss')}
              </OrderSuccessItem>
              {data?.data.defaultOrderStatusType === 'DEPOSIT_WAIT' && (
                <>
                  <OrderSuccessItem label="입금계좌">
                    {data?.data.payInfo.bankInfo.bankName} {data?.data.payInfo.bankInfo.account}{' '}
                    (예금주: {data?.data.payInfo.bankInfo.depositorName})
                  </OrderSuccessItem>
                  <OrderSuccessItem label="입금기간">
                    {dayjs(data?.data.paymentExpirationYmdt).format('YYYY년 MM월 DD일 HH:mm 까지')}{' '}
                    (입금되지 않았을 경우 자동으로 주문무효 처리)
                  </OrderSuccessItem>
                </>
              )}

              <OrderSuccessItem label="상품금액">
                {data?.data.lastOrderAmount.standardAmt.toLocaleString()} 원
              </OrderSuccessItem>
              <OrderSuccessItem label="할인금액">
                <div className="discount-sum">
                  <span>
                    -{' '}
                    {discountList
                      .reduce((acc, cur) => {
                        return acc + (cur.value ?? 0);
                      }, 0)
                      .toLocaleString()}{' '}
                  </span>
                  원
                </div>
              </OrderSuccessItem>
              {discountList
                .filter(v => v.value)
                .map(v => (
                  <div key={v.label} className="discount-list">
                    - {v.label}
                    <span>- {v.value?.toLocaleString()} 원</span>
                  </div>
                ))}
              <OrderSuccessItem label="배송비">
                {data?.data.lastOrderAmount.deliveryAmt.toLocaleString()} 원
              </OrderSuccessItem>

              <Divider />
              <OrderSuccessItem label="결제금액" className="total-sum">
                <span>{data?.data.lastOrderAmount.chargeAmt.toLocaleString()}</span> 원
              </OrderSuccessItem>
            </OrderContentTemplate>

            <OrderContentTemplate label="배송정보">
              <OrderSuccessItem label="주문번호">{data?.data.orderNo}</OrderSuccessItem>
              <OrderSuccessItem label="주문자">{data?.data.orderer.ordererName}</OrderSuccessItem>
              <OrderSuccessItem label="휴대폰">
                {data?.data.orderer.ordererContact1}
              </OrderSuccessItem>
              <OrderSuccessItem label="이메일">{data?.data.orderer.ordererEmail}</OrderSuccessItem>
            </OrderContentTemplate>

            <ul>
              <li>
                상품이 품절되는 경우 주문이 자동으로 취소되며, 주문하신 분의 SMS와 이메일로 관련
                안내를 발송해드립니다.
              </li>
              <li>상세내역은 마이페이지에서 확인하실 수 있습니다.</li>
            </ul>

            <div className="order-button-wrapper">
              <Button
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
              <Button styleType="main" onClick={() => router.push('/')}>
                계속 쇼핑하기
              </Button>
            </div>
          </>
        )}
      </div>
    </PcOrderSuccessPageStyled>
  );
};

export default PcOrderSuccess;
