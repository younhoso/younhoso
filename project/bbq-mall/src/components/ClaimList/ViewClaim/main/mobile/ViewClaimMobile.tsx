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
import { ClaimDetail } from '@/types/orderHistoryRelated';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { ViewClaimProps } from '../pc/ViewClaim';
import { ViewClaimMobileStyled } from './styled';

const ViewClaimMobile = ({
  className,
  resetClaimType,
  activeOrderOption,
  data,
}: ViewClaimProps) => {
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const {
    data: claimdata,
    isPending,
    refetch,
  } = useQuery({
    queryKey: [`/${isSignIn ? 'profile' : 'guest'}/claims/${activeOrderOption.claimNo}/result`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<ClaimDetail>(
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
    <ViewClaimMobileStyled
      onClose={resetClaimType}
      open
      title="클레임 상세 보기"
      className={clsx('ViewClaimMobile', className)}
      hideHeaderDivider
      footer={null}
    >
      <h4>
        주문번호 <span>{data.orderNo}</span>
      </h4>
      <Divider borderColor={theme.colors.gray999} marginTop="0" marginBottom="0" />
      {isPending ? (
        <Loading.Mobile />
      ) : (
        <>
          <div className="product-wrapper">
            {claimdata?.data.claimedOptions.map(v => (
              <div key={v.orderOptionNo}>
                <Image src={'https:' + v.imageUrl} width={80} height={80} alt="image" />
                <div className="claim-detail">
                  <p>{v.productName}</p>
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
            ))}
          </div>
          <div className="product-claim-reason">
            <div className="claim-label">취소 사유</div>
            <OrderContentItem.Mobile title="취소사유">
              <p className="red-highlight">
                {claimdata?.data.claimReasonType && cancelTypeToKr[claimdata?.data.claimReasonType]}
              </p>
            </OrderContentItem.Mobile>
            <OrderContentItem.Mobile title="상세사유">
              {claimdata?.data.claimReasonDetail || '상세사유를 작성하지 않으셨습니다.'}
            </OrderContentItem.Mobile>
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
    </ViewClaimMobileStyled>
  );
};

export default ViewClaimMobile;
