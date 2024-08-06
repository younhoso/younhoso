'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import rightArrowRed from '@/assets/images/my/right-arrow-red.svg';
import AddCartButton from '@/components/AddCartButton';
import Button from '@/components/Button';
import ClaimList from '@/components/ClaimList';
import ContentBox from '@/components/ContentBox';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import PageTitle from '@/components/PageTitle';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import {
  NextActionType,
  OrderHistoryDetail,
  OrderOption,
  ValueOfStaus,
  statusList,
} from '@/types/orderHistoryRelated';

import { deliveryStates } from '../mobile/OrderDetailMobile';
import { OrderDetailStyled } from './styled';

export interface OrderDetailProps {
  className?: string;
  data: OrderHistoryDetail | undefined;
  isPending: boolean;
  refetch: () => Promise<unknown>;
}

const OrderDetail = ({ className, isPending, data, refetch }: OrderDetailProps) => {
  const [claimType, setClaimType] = useState<ValueOfStaus | undefined>(undefined);
  const [activeOrderOption, setActiveOrderOption] = useState<OrderOption | undefined>(undefined);
  const { isSignIn } = useHandleIsSignIn();
  const router = useRouter();
  const discountList = [
    { label: '상품할인금액', value: data?.lastOrderAmount.immediateDiscountAmt },
    { label: '주문 쿠폰 할인', value: data?.lastOrderAmount.cartCouponDiscountAmt },
    { label: '상품 쿠폰 할인', value: data?.lastOrderAmount.productCouponDiscountAmt },
    { label: '포인트 할인', value: data?.lastOrderAmount.subPayAmt },
  ];

  const productList = data?.orderOptionsGroupByPartner.flatMap(v =>
    v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions),
  );

  const hasDeposiWait = data?.orderOptionsGroupByPartner
    .flatMap(v => v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions))
    .some(v => v.orderStatusType === 'DEPOSIT_WAIT');

  return (
    <>
      <OrderDetailStyled className={clsx('OrderDetail', className)}>
        <PageTitle
          title="주문내역 상세"
          suffix={
            isSignIn && (
              <div className="page-title-suffix">
                배송 또는 상품에 문제가 있나요?
                <span onClick={() => router.push('/pc/inquiry')}>
                  1:1 문의 <Image src={rightArrowRed} width={16} height={16} alt="go" />
                </span>
              </div>
            )
          }
          noBorder
        />
        {isPending ? (
          <>
            <Divider marginBottom="0" marginTop="0" />
            <Loading differ="120px" />
          </>
        ) : (
          data && (
            <>
              <ContentBox
                title={
                  <div className="content-box-title-flex">
                    <span>주문번호</span> {data.orderNo}
                  </div>
                }
              >
                <div className="content-item-wrapper">
                  {data.orderOptionsGroupByPartner.map(v =>
                    v.orderOptionsGroupByDelivery.map(k =>
                      k.orderOptions.map(j => (
                        <div key={j.optionNo}>
                          <Image src={'https:' + j.imageUrl} width={80} height={80} alt="image" />
                          <div className="product-info">
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
                          <div className="product-claim-type">
                            {j.claimStatusTypeLabel ?? j.orderStatusTypeLabel}
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
                            <AddCartButton
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
                            </AddCartButton>
                          </div>
                        </div>
                      )),
                    ),
                  )}
                </div>
              </ContentBox>
              <div className="order-history-detail-button-wrapper">
                {data.nextActions.map(v => (
                  <Button
                    key={v.nextActionType}
                    onClick={() => setClaimType(v.nextActionType)}
                    size="small"
                  >
                    {statusList[v.nextActionType].label}
                  </Button>
                ))}
                <AddCartButton
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
                </AddCartButton>
              </div>
              <ContentBox title="결제정보">
                <OrderContentItem label="결제방법" labelWidth="180px">
                  {data.payTypeLabel}
                </OrderContentItem>

                <OrderContentItem label="주문접수일시" labelWidth="180px">
                  {dayjs(new Date(data.orderYmdt)).format('YYYY.MM.DD HH:mm:ss')}
                </OrderContentItem>

                {hasDeposiWait && (
                  <>
                    <OrderContentItem label="입금계좌" labelWidth="180px">
                      {data.payInfo.bankInfo.bankName} {data.payInfo.bankInfo.account} (예금주:{' '}
                      {data.payInfo.bankInfo.depositorName})
                    </OrderContentItem>
                    <OrderContentItem label="입금기간" labelWidth="180px">
                      {dayjs(data.paymentExpirationYmdt).format('YYYY년 MM월 DD일 HH:mm 까지')}{' '}
                      (입금되지 않았을 경우 자동으로 주문무효 처리)
                    </OrderContentItem>
                  </>
                )}

                {!!data.lastOrderAmount.chargeAmt && (
                  <>
                    <OrderContentItem label="상품금액" labelWidth="180px">
                      {data.lastOrderAmount.standardAmt.toLocaleString()} 원
                    </OrderContentItem>
                    <OrderContentItem label="할인금액" labelWidth="180px">
                      <span className="payment-sum">
                        -{' '}
                        {discountList
                          .reduce((acc, cur) => {
                            return acc + (cur.value ?? 0);
                          }, 0)
                          .toLocaleString()}{' '}
                      </span>
                      원
                    </OrderContentItem>
                    {discountList
                      .filter(v => v.value)
                      .map(v => (
                        <div key={v.label} className="discount-list">
                          <p>{v.label}</p>
                          <span>- {v.value?.toLocaleString()} 원</span>
                        </div>
                      ))}
                    <OrderContentItem label="배송비" labelWidth="180px">
                      {data.lastOrderAmount.deliveryAmt.toLocaleString()} 원
                    </OrderContentItem>
                  </>
                )}

                <OrderContentItem label="최종 결제금액" labelWidth="180px">
                  <span className="payment-sum">
                    {data.lastOrderAmount.chargeAmt.toLocaleString()}
                  </span>{' '}
                  원
                </OrderContentItem>
              </ContentBox>
              <ContentBox title="주문정보">
                <OrderContentItem label="주문번호" labelWidth="180px">
                  {data.orderNo}
                </OrderContentItem>
                <OrderContentItem label="주문자" labelWidth="180px">
                  {data.orderer.ordererName}
                </OrderContentItem>
                <OrderContentItem label="휴대폰" labelWidth="180px">
                  {data.orderer.ordererContact1}
                </OrderContentItem>
                <OrderContentItem label="이메일" labelWidth="180px">
                  {data.orderer.ordererEmail}
                </OrderContentItem>
              </ContentBox>
              <ContentBox title="배송정보">
                <OrderContentItem label="받는분" labelWidth="180px">
                  {data.shippingAddress.receiverName}
                </OrderContentItem>
                <OrderContentItem label="휴대폰" labelWidth="180px">
                  {data.shippingAddress.receiverContact1}
                </OrderContentItem>

                <OrderContentItem label="배송국가" labelWidth="180px">
                  {data.shippingAddress.countryCd}
                </OrderContentItem>
                <OrderContentItem label="배송지" labelWidth="180px">
                  {data.shippingAddress.receiverAddress +
                    ' ' +
                    data.shippingAddress.receiverDetailAddress}
                </OrderContentItem>
              </ContentBox>
              {data.refundInfos?.length && (
                <ContentBox title="환불정보">
                  <OrderContentItem label="환불수단" labelWidth="180px">
                    {data.refundInfos[0].refundTypeLabel}
                  </OrderContentItem>
                  <OrderContentItem label="반품 배송비 차감" labelWidth="180px">
                    <span className="payment-sum">
                      {data.refundInfos
                        .reduce((acc, cur) => {
                          return acc + cur.deliveryAmtInfo.totalAmt;
                        }, 0)
                        .toLocaleString()}
                    </span>{' '}
                    원
                  </OrderContentItem>
                  <OrderContentItem label="환불금액" labelWidth="180px">
                    <span className="stress-needed">
                      {data.refundInfos
                        .reduce((acc, cur) => {
                          return acc + cur.productAmtInfo.totalAmt;
                        }, 0)
                        .toLocaleString()}
                    </span>{' '}
                    원
                  </OrderContentItem>
                </ContentBox>
              )}
            </>
          )
        )}
      </OrderDetailStyled>
      <ClaimList
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

export default OrderDetail;
