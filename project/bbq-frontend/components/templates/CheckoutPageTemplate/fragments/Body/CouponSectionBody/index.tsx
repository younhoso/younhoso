import { FC } from 'react';

import { Arrow, Flex, Grid, Space, Text } from '@/components/atoms';
import { COLOR_BLACK, COLOR_RED, FONTSIZE_14, PLANCK } from '@/constants';

import { CheckoutPageTemplateProps } from '../../../CheckoutPageTemplate';

const CouponSectionBody: FC<CheckoutPageTemplateProps> = ({
  checkoutData,
  selectedCoupons,
  appliedCouponAmounts,
  handleCouponMenuItemButtonClick,
}) => {
  return (
    <>
      <Grid columnCount={1} gap={PLANCK * 1.5}>
        {[
          {
            key: 'MEMBERSHIP_COUPON_PRIVATE',
            name: '할인/증정쿠폰',
            count: checkoutData?.membershipCouponInfoList.length ?? 0,
            appliedCount: selectedCoupons.membership.map(coupon => coupon.benefitType === 'PRODUCT')
              .length,
            type: 'boolean',
            onClick: () => {
              handleCouponMenuItemButtonClick({ type: 'membership' });
            },
          },
          {
            key: 'VOUCHER',
            name: '지류상품권',
            count: checkoutData?.voucherInfoList.length ?? 0,
            appliedCount: undefined,
            type: 'discount_amount',
            onClick: () => {
              handleCouponMenuItemButtonClick({ type: 'voucher' });
            },
          },
          {
            key: 'PRICE_COUPON',
            name: '금액권',
            count: checkoutData?.priceCouponInfoList.length ?? 0,
            appliedCount: undefined,
            type: 'discount_amount',
            onClick: () => {
              handleCouponMenuItemButtonClick({ type: 'price' });
            },
          },
        ].map((item, index) => {
          return (
            <Flex.RSC
              key={index}
              full={true}
              style={{
                border: '1px solid #e8eaf0',
                borderRadius: '7px',
                height: '35px',
                cursor: item.count ? 'pointer' : 'default',
              }}
              layout="auto 1 auto auto"
              onClick={item.count ? item.onClick : () => {}}
            >
              <Space.V2_5 />
              <Text size={FONTSIZE_14} color={item.count ? COLOR_BLACK : 'rgba(0,0,0,0.3)'}>
                {`${item.name}`} {item.count > 0 ? `(${item.count}장 보유)` : `(없음)`}
              </Text>
              {(() => {
                const discounts = appliedCouponAmounts?.discountInfoList.filter(
                  d => d.paymentType === item.key,
                );
                if (item.type === 'boolean' && (item.appliedCount ?? 0) > 0) {
                  return (
                    <Text size={FONTSIZE_14} color={COLOR_RED}>
                      쿠폰 적용 완료
                    </Text>
                  );
                } else if (item.type === 'discount_amount' && discounts && discounts.length > 0) {
                  return (
                    <Text size={FONTSIZE_14} color={COLOR_RED}>
                      {`-${discounts
                        .reduce((total, discount) => total + discount.amount, 0)
                        .toLocaleString()}원`}
                    </Text>
                  );
                } else {
                  return (
                    <Arrow.Right
                      size={3}
                      thickness={1.5}
                      color={item.count ? COLOR_BLACK : 'rgba(0,0,0,0.3)'}
                    />
                  );
                }
              })()}
              <Space.V4 />
            </Flex.RSC>
          );
        })}
      </Grid>
    </>
  );
};

export default CouponSectionBody;

/*
membershipCouponInfoList 할인/증정쿠폰
voucherInfoList: 지류상품권
priceCouponInfoList: 금액권
 */
