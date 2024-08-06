import { FC } from 'react';

import { Flex, Grid, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_13, FONTSIZE_16, PLANCK } from '@/constants';

import { Template } from '../components';
import { MyPageMembershipPageTemplateComponentProps } from './MyPageMembershipPageTemplate';

export const MyPageMembershipPageTemplateMobile: FC<
  MyPageMembershipPageTemplateComponentProps
> = ({}) => {
  return (
    <Template.Mobile title="멤버십 안내">
      <Text size={FONTSIZE_16}>회원등급 정책</Text>
      <Space.H3 />
      <Flex.CSS gap={PLANCK * 1} style={{ marginLeft: PLANCK * 2 }}>
        <Text size={FONTSIZE_13} lineHeight={'1.4em'}>
          • BBQ 주문앱, BBQ몰 합산 결제금액에 따라 등급 부여 합니다.
        </Text>
        <Text size={FONTSIZE_13} lineHeight={'1.4em'}>
          • 전월 결제금액 기준으로 매월 1일 오전 중에 등급이 부여 됩니다. (⚠배송,배달비 제외)
        </Text>
      </Flex.CSS>
      <Space.H6 />
      <Grid columnCount={1} gap={PLANCK * 6}>
        <div>
          <Text size={FONTSIZE_13}>● 전월 구매 금액별 회원등급 표</Text>
          <Space.H2 />
          <Image width={'100%'} height={'auto'} src="mypage/slider.png" className="pointer-none" />
        </div>
        <div>
          <Text size={FONTSIZE_13}>● 회원 등급별 쿠폰 지급 (매월)</Text>
          <Space.H2 />
          <Image
            width={'100%'}
            height={'auto'}
            src="/mypage/membership_table.png"
            className="pointer-none"
          />
        </div>
        <div>
          <Text size={FONTSIZE_13}>● 쿠폰 별 사용조건</Text>
          <Space.H2 />
          <Image
            width={'100%'}
            height={'auto'}
            src="/mypage/table_coupon.png"
            className="pointer-none"
          />
        </div>
      </Grid>
    </Template.Mobile>
  );
};
