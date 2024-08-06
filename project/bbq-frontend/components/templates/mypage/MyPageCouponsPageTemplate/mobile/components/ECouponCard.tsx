import { FC } from 'react';

import { CouponAPI } from '@/apis';
import { Box, CheckBox, Flex, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_11, FONTSIZE_13, FONTSIZE_15, PLANCK } from '@/constants';
import { ECoupon } from '@/types';
import { parseApiError } from '@/utils';

export const ECouponCard: FC<{
  coupon: ECoupon;
  checked: boolean;
  handleCheckClick: () => void;
}> = ({ coupon, checked, handleCheckClick }) => {
  return (
    <Box background="#fbfbfb" border="#ededed" padding={PLANCK * 3}>
      <Flex.RSS full={true} style={{ height: '100%' }}>
        <CheckBox.Mobile checked={checked} onClick={handleCheckClick} />
        <Space.V1 />
        <Image
          src={
            coupon.menuImageUrl && coupon.menuImageUrl.length
              ? coupon.menuImageUrl
              : '/coupon/e-coupon-thumbnail.png'
          }
          width={100}
          height={100}
          style={{ borderRadius: 15, boxShadow: '2px 4px 4px rgba(0,0,0,0.1)' }}
        />
        <Space.V3 />
        <div>
          <Space.H1 />
          <Text size={FONTSIZE_11}>[교환권]</Text>
          <Space.H1_5 />
          <Text size={FONTSIZE_15}>{coupon.menuName}</Text>
          <Space.H2 />
          <Text size={FONTSIZE_13}>{(coupon.menuPrice ?? 0).toLocaleString()}원</Text>
          <Space.H2 />
          <Text size={FONTSIZE_11} color={'#777777'}>
            쿠폰번호 {coupon.couponNo}
          </Text>
          <Space.H1 />
          <Text size={FONTSIZE_11} color={'#777777'}>
            유효기간 {coupon.endDate}까지 사용 가능
          </Text>
          <Space.H2 />
          <div
            style={{ cursor: 'pointer' }}
            onClick={async () => {
              if (!confirm('쿠폰을 삭제하시겠습니까?')) return;
              try {
                await CouponAPI.E.delete({ id: coupon.id });
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
      </Flex.RSS>
    </Box>
  );
};
