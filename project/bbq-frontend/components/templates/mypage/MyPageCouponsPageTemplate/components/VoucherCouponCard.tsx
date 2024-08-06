import { FC } from 'react';

import { CouponAPI } from '@/apis';
import { Box, Flex, Icon, Image, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_12, FONTSIZE_20, PLANCK } from '@/constants';
import { VoucherCoupon } from '@/types';
import { parseApiError } from '@/utils';

export const VoucherCouponCard: FC<{ coupon: VoucherCoupon }> = ({ coupon }) => {
  return (
    <Box background="#fbfbfb" border="#ededed" padding={PLANCK * 7}>
      {
        <Flex.RSC full={true} layout="auto auto 1 auto" style={{ height: '100%' }}>
          <Image
            src={'/coupon/coupon-placeholder-thumbnail.png'}
            width={135}
            height={135}
            backgroundPosition="center"
            backgroundSize="cover"
          >
            <Flex.CCC full={true}>
              <Space.H1_5 />
              <Text
                color={COLOR_WHITE}
                size={FONTSIZE_20}
                weight={700}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
              >
                GIFTCARD
              </Text>
              <Space.H0_5 />
              <Text
                color={COLOR_WHITE}
                size={33}
                weight={900}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
              >
                {(coupon.price ?? 0).toLocaleString()}
              </Text>
            </Flex.CCC>
          </Image>
          <Space.V6 />
          <div>
            <Text size={FONTSIZE_12}>[지류 상품권]</Text>
            <Space.H1_5 />
            <Text size={FONTSIZE_20}>BBQ 리뷰 상품권</Text>
            <Space.H2 />
            <Text>{(coupon.price ?? 0).toLocaleString()}원</Text>
            <Space.H4 />
            <Text size={FONTSIZE_12} color={'#777777'}>
              쿠폰번호 {coupon.voucherSn}
            </Text>
            <Space.H1 />
            <Text size={FONTSIZE_12} color={'#777777'}>
              유효기간 {coupon.endDate}
            </Text>
          </div>
          <div
            style={{ cursor: 'pointer', opacity: 0.5 }}
            onClick={async () => {
              if (!confirm('쿠폰을 삭제하시겠습니까?')) return;
              try {
                await CouponAPI.Voucher.delete({ id: coupon.id });
                alert('쿠폰을 삭제했습니다.');
                window.location.reload();
              } catch (err) {
                alert(parseApiError(err).message);
                window.location.reload();
              }
            }}
          >
            <Icon src={'close-circle-black.svg'} size={22} />
          </div>
        </Flex.RSC>
      }
    </Box>
  );
};
