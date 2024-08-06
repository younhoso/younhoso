import { FC } from 'react';

import { CouponAPI } from '@/apis';
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
import { VoucherCoupon } from '@/types';
import { parseApiError } from '@/utils';

export const VoucherCouponCard: FC<{ coupon: VoucherCoupon }> = ({ coupon }) => {
  return (
    <Box background="#fbfbfb" border="#ededed" padding={PLANCK * 3}>
      {
        <Flex.RSC full={true} layout="auto auto 1 1" style={{ height: '100%' }}>
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
                GIFTCARD
              </Text>
              <Space.H1 />
              <Text
                color={COLOR_WHITE}
                size={FONTSIZE_24}
                weight={900}
                style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
              >
                {(coupon.price ?? 0).toLocaleString()}
              </Text>
            </Flex.CCC>
          </Image>
          <Space.V3 />
          <div>
            <Text size={FONTSIZE_11}>[지류 상품권]</Text>
            <Space.H1 />
            <Text size={FONTSIZE_15}>BBQ 리뷰 상품권</Text>
            <Space.H2 />
            <Text size={FONTSIZE_13}>{(coupon.price ?? 0).toLocaleString()}원</Text>
            <Space.H2 />
            <Text size={FONTSIZE_11} color={'#777777'}>
              쿠폰번호 {coupon.voucherSn}
            </Text>
            <Space.H1 />
            <Text size={FONTSIZE_11} color={'#777777'}>
              유효기간 {coupon.endDate}
            </Text>
            <Space.H2 />
            <div
              style={{ cursor: 'pointer' }}
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
              <Text size={FONTSIZE_11} decoration="underline">
                삭제하기
              </Text>
            </div>
          </div>
        </Flex.RSC>
      }
    </Box>
  );
};
