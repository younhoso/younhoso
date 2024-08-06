import { FC } from 'react';

import { Box, Flex, Image, Space, Text } from '@/components/atoms';
import {
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_13,
  FONTSIZE_15,
  FONTSIZE_16,
  FONTSIZE_24,
  PLANCK,
} from '@/constants';
import { MembershipCoupon } from '@/types';

export const MembershipCouponCard: FC<{ coupon: MembershipCoupon }> = ({ coupon }) => {
  return (
    <Box background="#fbfbfb" border="#ededed" padding={PLANCK * 3}>
      <Flex.RSC full={true} layout="auto auto 1 1">
        <Image
          src={'/coupon/coupon-placeholder-thumbnail.png'}
          width={100}
          height={100}
          backgroundPosition="center"
          backgroundSize="cover"
        >
          <Flex.CCC full={true}>
            <Space.H1_5 />
            <Text
              color={COLOR_WHITE}
              size={FONTSIZE_16}
              weight={700}
              style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
            >
              COUPON
            </Text>
            <Space.H1 />
            <Text
              color={COLOR_WHITE}
              size={FONTSIZE_24}
              weight={900}
              style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
            >
              {(() => {
                switch (coupon.benefitType) {
                  case 'FLAT_DISCOUNT':
                    return `${(coupon.discountAmount ?? 0).toLocaleString()}`;
                  case 'RATE_DISCOUNT':
                    return `${(coupon.discountRate ?? 0).toLocaleString()}%`;
                  case 'PRODUCT':
                    return `추가 증정`;
                }
              })()}
            </Text>
          </Flex.CCC>
        </Image>
        <Space.V3 />
        <div>
          <Text size={FONTSIZE_11}>[멤버십 쿠폰]</Text>
          <Space.H1 />
          <Text size={FONTSIZE_15}>{coupon.couponName}</Text>
          <Space.H2 />
          <Text size={FONTSIZE_13}>
            {(() => {
              switch (coupon.benefitType) {
                case 'FLAT_DISCOUNT':
                  return `${(coupon.discountAmount ?? 0).toLocaleString()}원 할인`;
                case 'RATE_DISCOUNT':
                  return `${(coupon.discountRate ?? 0).toLocaleString()}% 할인`;
                case 'PRODUCT':
                  return `추가 메뉴/제품 증정`;
              }
            })()}
          </Text>
          <Space.H2 />
          <Text size={FONTSIZE_11} color={'#777777'}>
            쿠폰번호 {coupon.couponNo}
          </Text>
          <Space.H1 />
          <Text size={FONTSIZE_11} color={'#777777'}>
            유효기간 {coupon.useStartsAt.split(' ')[0]} ~ {coupon.useEndsAt.split(' ')[0]}
          </Text>
        </div>
      </Flex.RSC>
      <Space.H4 />
      <div
        style={{
          backgroundColor: '#f4f4f4',
          borderRadius: 7,
          padding: PLANCK * 3,
          boxShadow: 'inset 2px 2px 2px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text size={FONTSIZE_11} weight={700}>
          Coupon Info.
        </Text>
        <Space.H1_5 />
        <Text
          size={FONTSIZE_13}
          color={'#777777'}
          lineHeight={'1.4em'}
          dangerouslySetInnerHTML={{
            __html: (coupon.description || '').replace(/\n/g, '<br>'),
          }}
        ></Text>
      </div>
    </Box>
  );
};
