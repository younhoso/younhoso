'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import AddCartButton from '@/components/AddCartButton';
import Button from '@/components/Button';
import ClaimList from '@/components/ClaimList';
import ContentBox from '@/components/ContentBox';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { theme } from '@/provider/CustomThemeProvider';
import { NextActionType, OrderOption, ValueOfStaus, statusList } from '@/types/orderHistoryRelated';

import { OrderDetailProps } from '../pc/OrderDetail';
import { OrderDetailMobileStyled } from './styled';

export const deliveryStates = ['DELIVERY_ING', 'DELIVERY_DONE'];

const OrderDetailMobile = ({ className, data, isPending, refetch }: OrderDetailProps) => {
  const [claimType, setClaimType] = useState<ValueOfStaus | undefined>(undefined);
  const [activeOrderOption, setActiveOrderOption] = useState<OrderOption | undefined>(undefined);
  const router = useRouter();
  const { isSignIn } = useHandleIsSignIn();
  const discountList = [
    { label: '상품할인금액', value: data?.lastOrderAmount.immediateDiscountAmt },
    { label: '주문 쿠폰 할인', value: data?.lastOrderAmount.cartCouponDiscountAmt },
    { label: '상품 쿠폰 할인', value: data?.lastOrderAmount.productCouponDiscountAmt },
    { label: '포인트 할인', value: data?.lastOrderAmount.subPayAmt },
  ];

  useEffect(() => {
    if (!claimType) {
      document.body.style.overflow = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [claimType]);

  const productList = data?.orderOptionsGroupByPartner.flatMap(v =>
    v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions),
  );

  const hasDeposiWait = data?.orderOptionsGroupByPartner
    .flatMap(v => v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions))
    .some(v => v.orderStatusType === 'DEPOSIT_WAIT');

  return (
    <>
      <OrderDetailMobileStyled className={clsx('OrderDetailMobile', className)}>
        {isPending ? (
          <Loading.Mobile />
        ) : (
          data && (
            <>
              <ContentBox.Mobile
                className="mobile-order-top-content-box"
                title={`주문번호 ${data.orderNo}`}
              >
                <div className="content-item-wrapper">
                  {data.orderOptionsGroupByPartner.map(v =>
                    v.orderOptionsGroupByDelivery.map(k =>
                      k.orderOptions.map(j => {
                        const isSingleOption = j.productName === j.optionValue;

                        return (
                          <div key={j.optionNo}>
                            <div className="order-item-info">
                              <Image
                                src={'https:' + j.imageUrl}
                                width={72}
                                height={72}
                                alt="image"
                              />
                              <div>
                                <p onClick={() => router.push(`/categories/detail/${j.productNo}`)}>
                                  {j.productName}
                                </p>
                                <p className="chosen-option">
                                  {'선택옵션 : ' + (isSingleOption ? '없음' : j.optionValue)}
                                </p>
                                <div>
                                  {j.price.buyAmt.toLocaleString()}원
                                  <span>
                                    <span> | </span>
                                    {j.orderCnt.toLocaleString()}개
                                  </span>
                                  <span>{j.claimStatusTypeLabel ?? j.orderStatusTypeLabel}</span>
                                </div>
                              </div>
                            </div>
                            <div className="product-button-wrapper">
                              {[
                                ...j.nextActions,
                                ...(deliveryStates.includes(j.orderStatusType) && data.escrow
                                  ? [
                                      {
                                        nextActionType: 'RETURN' as NextActionType,
                                        uri: '',
                                        actionGroupType: '',
                                      },
                                    ]
                                  : []),
                              ]
                                .filter(
                                  x =>
                                    (isSignIn
                                      ? j.orderStatusType !== 'BUY_CONFIRM'
                                        ? x.nextActionType !== 'WRITE_REVIEW'
                                        : true
                                      : x.nextActionType !== 'WRITE_REVIEW') &&
                                    !(
                                      x.nextActionType === 'EXCHANGE' &&
                                      [
                                        'DEPOSIT_WAIT',
                                        'PAY_DONE',
                                        'PRODUCT_PREPARE',
                                        'DELIVERY_PREPARE',
                                      ].includes(j.orderStatusType)
                                    ),
                                )
                                .map(x => (
                                  <Button
                                    key={x.nextActionType}
                                    onClick={() => {
                                      setClaimType(x.nextActionType);
                                      setActiveOrderOption(j);
                                    }}
                                    size="micro"
                                  >
                                    {statusList[x.nextActionType].label}
                                  </Button>
                                ))}
                              <AddCartButton.Mobile
                                size="micro"
                                body={[
                                  {
                                    productNo: j.productNo,
                                    optionNo: j.optionNo,
                                    orderCnt: j.orderCnt,
                                    optionInputs: j.inputs,
                                  },
                                ]}
                              >
                                장바구니 담기
                              </AddCartButton.Mobile>
                            </div>
                          </div>
                        );
                      }),
                    ),
                  )}
                </div>
                <div className="order-history-detail-button-wrapper">
                  <Divider marginTop="16px" marginBottom="20px" />
                  {data.nextActions.map(v => (
                    <Button
                      key={v.nextActionType}
                      onClick={() => setClaimType(v.nextActionType)}
                      size="micro"
                    >
                      {statusList[v.nextActionType].label}
                    </Button>
                  ))}
                  <AddCartButton.Mobile
                    size="small"
                    styleType="main"
                    body={
                      productList?.map(v => ({
                        productNo: v.productNo,
                        optionNo: v.optionNo,
                        orderCnt: v.orderCnt,
                        optionInputs: v.inputs,
                      })) ?? []
                    }
                  >
                    전체상품 다시 담기
                  </AddCartButton.Mobile>
                </div>
              </ContentBox.Mobile>
              <Divider.Mobile />
              <ContentBox.Mobile title="결제정보">
                <OrderContentItem.Mobile title="결제방법">
                  {data.payTypeLabel}
                </OrderContentItem.Mobile>

                <OrderContentItem.Mobile title="결제일시">
                  {dayjs(new Date(data.orderYmdt ?? '')).format('YYYY.MM.DD HH:mm:ss')}
                </OrderContentItem.Mobile>

                {hasDeposiWait && (
                  <>
                    <OrderContentItem.Mobile title="입금계좌">
                      {data.payInfo.bankInfo.bankName} {data.payInfo.bankInfo.account} (예금주:{' '}
                      {data.payInfo.bankInfo.depositorName})
                    </OrderContentItem.Mobile>
                    <OrderContentItem.Mobile title="입금기간">
                      {dayjs(data.paymentExpirationYmdt).format('YYYY년 MM월 DD일 HH:mm 까지')}{' '}
                      (입금되지 않았을 경우 자동으로 주문무효 처리)
                    </OrderContentItem.Mobile>
                  </>
                )}

                {!!data.lastOrderAmount.chargeAmt && (
                  <>
                    <OrderContentItem.Mobile title="상품금액">
                      {data.lastOrderAmount.standardAmt.toLocaleString()} 원
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
                      {data.lastOrderAmount.deliveryAmt.toLocaleString()} 원
                    </OrderContentItem.Mobile>
                  </>
                )}

                <Divider marginBottom="16px" marginTop="16px" borderColor={theme.colors.grayaea} />
                <OrderContentItem.Mobile title="결제금액">
                  <span className="discount-sum">
                    {data.lastOrderAmount.chargeAmt.toLocaleString()}
                  </span>{' '}
                  원
                </OrderContentItem.Mobile>
              </ContentBox.Mobile>
              <Divider.Mobile />
              <ContentBox.Mobile title="주문정보">
                <OrderContentItem.Mobile title="주문번호">{data.orderNo}</OrderContentItem.Mobile>
                <OrderContentItem.Mobile title="주문자">
                  {data.orderer.ordererName}
                </OrderContentItem.Mobile>
                <OrderContentItem.Mobile title="휴대폰">
                  {data.orderer.ordererContact1}
                </OrderContentItem.Mobile>
                <OrderContentItem.Mobile title="이메일">
                  {data.orderer.ordererEmail}
                </OrderContentItem.Mobile>
              </ContentBox.Mobile>
              <Divider.Mobile />
              <ContentBox.Mobile title="배송정보">
                <OrderContentItem.Mobile title="받는분">
                  {data.shippingAddress.receiverName}
                </OrderContentItem.Mobile>
                <OrderContentItem.Mobile title="휴대폰">
                  {data.shippingAddress.receiverContact1}
                </OrderContentItem.Mobile>
                <OrderContentItem.Mobile title="배송국가">
                  {data.shippingAddress.countryCd}
                </OrderContentItem.Mobile>
                <OrderContentItem.Mobile title="배송지">
                  {data.shippingAddress.receiverAddress +
                    ' ' +
                    data.shippingAddress.receiverDetailAddress}
                </OrderContentItem.Mobile>
              </ContentBox.Mobile>
              {data.refundInfos?.length && (
                <>
                  <Divider.Mobile />
                  <ContentBox.Mobile title="환불정보">
                    <OrderContentItem.Mobile title="환불수단">
                      {data.refundInfos[0].refundTypeLabel}
                    </OrderContentItem.Mobile>
                    <OrderContentItem.Mobile title="배송비 차감">
                      <span className="payment-sum">
                        {data.refundInfos
                          .reduce((acc, cur) => {
                            return acc + cur.deliveryAmtInfo.totalAmt;
                          }, 0)
                          .toLocaleString()}
                      </span>{' '}
                      원
                    </OrderContentItem.Mobile>
                    <OrderContentItem.Mobile title="환불금액">
                      <span className="stress-needed">
                        {data.refundInfos
                          .reduce((acc, cur) => {
                            return acc + cur.productAmtInfo.totalAmt;
                          }, 0)
                          .toLocaleString()}
                      </span>{' '}
                      원
                    </OrderContentItem.Mobile>
                  </ContentBox.Mobile>
                </>
              )}
            </>
          )
        )}
      </OrderDetailMobileStyled>
      <ClaimList.Mobile
        claimType={claimType}
        resetClaimType={() => {
          setClaimType(undefined);
          setActiveOrderOption(undefined);
        }}
        activeOrderOption={activeOrderOption}
        data={data}
        refetch={refetch}
      />
    </>
  );
};

export default OrderDetailMobile;
