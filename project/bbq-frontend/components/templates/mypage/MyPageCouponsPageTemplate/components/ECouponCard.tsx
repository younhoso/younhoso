import { FC } from 'react';

import { CouponAPI } from '@/apis';
import { Box, CheckBox, Flex, Icon, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_12, FONTSIZE_20, PLANCK } from '@/constants';
import { ECoupon } from '@/types';
import { parseApiError } from '@/utils';

export const ECouponCard: FC<{
  coupon: ECoupon;
  checked: boolean;
  handleCheckClick: () => void;
}> = ({ coupon, checked, handleCheckClick }) => {
  return (
    <Box background="#fbfbfb" border="#ededed" padding={PLANCK * 7}>
      <Flex.RSS full={true} style={{ height: '100%' }}>
        <CheckBox checked={checked} onClick={handleCheckClick} />
        <Space.V3 />
        <Image
          src={
            coupon.menuImageUrl && coupon.menuImageUrl.length
              ? coupon.menuImageUrl
              : '/coupon/e-coupon-thumbnail.png'
          }
          width={135}
          height={135}
          style={{ borderRadius: 15, boxShadow: '2px 4px 4px rgba(0,0,0,0.1)' }}
        />
        <Space.V5 />
        <div>
          <Space.H2 />
          <Text size={FONTSIZE_12}>[교환권]</Text>
          <Space.H1_5 />
          <Text size={FONTSIZE_20}>{coupon.menuName}</Text>
          <Space.H2 />
          <Text>{(coupon.menuPrice ?? 0).toLocaleString()}원</Text>
          <Space.H4 />
          <Text size={FONTSIZE_12} color={'#777777'}>
            쿠폰번호 {coupon.couponNo}
          </Text>
          <Space.H1 />
          <Text size={FONTSIZE_12} color={'#777777'}>
            유효기간 {coupon.endDate}까지 사용 가능
          </Text>
        </div>
        <div style={{ flex: 1 }}></div>
        <div
          style={{ cursor: 'pointer', opacity: 0.5 }}
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
          <Icon src={'close-circle-black.svg'} size={22} />
        </div>
      </Flex.RSS>
    </Box>
  );
};
