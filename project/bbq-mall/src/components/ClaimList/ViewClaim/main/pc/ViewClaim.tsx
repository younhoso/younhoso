'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { cancelTypeToKr } from '@/constant/cancelTypeToKr';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { theme } from '@/provider/CustomThemeProvider';
import { ClaimDetail, OrderHistoryDetail, OrderOption } from '@/types/orderHistoryRelated';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { ViewClaimStyled } from './styled';

export interface ViewClaimProps {
  className?: string;
  resetClaimType: () => void;
  activeOrderOption: OrderOption;
  data: OrderHistoryDetail;
}

const ViewClaim = ({ className, resetClaimType, activeOrderOption, data }: ViewClaimProps) => {
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const {
    data: claimdata,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [`/${isSignIn ? 'profile' : 'guest'}/claims/${activeOrderOption.claimNo}/result`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<ClaimDetail>(
        key,
        !isSignIn
          ? {
              headers: {
                guestToken: getSessionStorageItem(GUEST_TOKEN),
              },
            }
          : undefined,
      ),
    enabled: false,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    refetch();
  }, [isLoading]);

  return (
    <ViewClaimStyled
      open
      onClose={resetClaimType}
      onOk={resetClaimType}
      className={clsx('ViewClaim', className)}
      title="클레임 상세 보기"
    >
      <h4>
        주문번호 <span>{data.orderNo}</span>
      </h4>
      <Divider borderColor={theme.colors.gray999} />
      {isPending ? (
        <Loading height="440px" />
      ) : (
        <>
          <div className="product-wrapper">
            {claimdata?.data.claimedOptions.map(v => {
              const isSingleOption = v.productName === v.optionValue;

              return (
                <div key={v.orderOptionNo}>
                  <Image src={'https:' + v.imageUrl} width={80} height={80} alt="image" />
                  <div className="claim-detail">
                    <p className="product-name">{v.productName}</p>
                    <p className="option-name">
                      {'선택옵션 : ' + (isSingleOption ? '없음' : v.optionValue)}
                    </p>

                    <div>
                      {v.price.buyAmt.toLocaleString()}원{' '}
                      <span>
                        <span> | </span>
                        {v.orderCnt}개
                      </span>
                    </div>
                  </div>
                  <div className="claim-status">{v.claimStatusTypeLabel}</div>
                </div>
              );
            })}
          </div>
          <div className="product-claim-reason">
            <div className="claim-label">취소 사유</div>
            <OrderContentItem label="취소사유">
              <p className="red-highlight">
                {claimdata?.data.claimReasonType && cancelTypeToKr[claimdata?.data.claimReasonType]}
              </p>
            </OrderContentItem>
            <OrderContentItem label="취소상세사유">
              {claimdata?.data.claimReasonDetail || '상세사유를 작성하지 않으셨습니다.'}
            </OrderContentItem>
          </div>
          <div className="product-refund-info">
            <div className="refund-title">환불정보</div>
            <div className="refund-detail">
              <span>환불상품금액</span>
              {claimdata?.data.claimPriceInfo.productAmtInfo.totalAmt.toLocaleString()} 원
            </div>
            <div className="refund-detail">
              <span>환불차감금액</span>
              {claimdata?.data.claimPriceInfo.additionalPayAmt.toLocaleString()} 원
            </div>
            <div className="refund-detail">
              <span>환불배송비</span>
              {claimdata?.data.claimPriceInfo.deliveryAmtInfo.totalAmt.toLocaleString()} 원
            </div>
            <Divider />
            <div className="refund-detail">
              <span>환불수단</span>
              {claimdata?.data.claimPriceInfo.refundTypeLabel}
            </div>
            <div className={clsx('refund-detail', 'refund-price-stress')}>
              환불금액
              <span>{claimdata?.data.claimPriceInfo.refundMainPayAmt.toLocaleString()} 원</span>
            </div>
            {!!claimdata?.data.claimPriceInfo.refundSubPayAmt && (
              <div className={clsx('sub', 'refund-detail')}>
                - 반환 예정 포인트{' '}
                <span>{claimdata?.data.claimPriceInfo.refundSubPayAmt.toLocaleString()} 원</span>
              </div>
            )}
            {!!claimdata?.data.claimPriceInfo.productAmtInfo.productCouponDiscountAmt && (
              <div className={clsx('sub', 'refund-detail')}>
                - 반환 예정 상품 쿠폰
                <span>
                  {claimdata?.data.claimPriceInfo.productAmtInfo.productCouponDiscountAmt.toLocaleString()}{' '}
                  원
                </span>
              </div>
            )}
            {!!claimdata?.data.claimPriceInfo.subtractionAmtInfo.cartCouponAmt && (
              <div className={clsx('sub', 'refund-detail')}>
                - 반환 예정 주문 쿠폰
                <span>
                  {claimdata?.data.claimPriceInfo.subtractionAmtInfo.cartCouponAmt.toLocaleString()}{' '}
                  원
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </ViewClaimStyled>
  );
};

export default ViewClaim;
