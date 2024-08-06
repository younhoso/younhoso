import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Flex, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_15, FONTSIZE_17, PLANCK } from '@/constants';

import { Template } from '../components';
import { MyPageMembershipPageTemplateMobile } from './mobile';

export interface MyPageMembershipPageTemplateProps {}

export interface MyPageMembershipPageTemplateComponentProps
  extends MyPageMembershipPageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageMembershipPageTemplate: FC<MyPageMembershipPageTemplateComponentProps> & {
  Mobile: FC<MyPageMembershipPageTemplateComponentProps>;
} = ({}) => {
  return (
    <Template title="멤버십 안내">
      <Text size={FONTSIZE_17}>회원등급 정책</Text>
      <Space.H4 />
      <Flex.CSS gap={PLANCK * 2}>
        <Text size={FONTSIZE_15}>• BBQ 주문앱, BBQ몰 합산 결제금액에 따라 등급 부여 합니다.</Text>
        <Text size={FONTSIZE_15}>
          • 전월 결제금액 기준으로 매월 1일 오전 중에 등급이 부여 됩니다. (⚠배송,배달비 제외)
        </Text>
      </Flex.CSS>
      <Space.H4 />
      <InformationWrapper>
        <InformationWrapperSection>
          <Text>● 전월 구매 금액별 회원등급 표</Text>
          <Image width={'100%'} height={'auto'} src="mypage/slider.png" className="pointer-none" />
        </InformationWrapperSection>
        <InformationWrapperSection>
          <Text>● 회원 등급별 쿠폰 지급 (매월)</Text>
          <Image
            width={'100%'}
            height={'auto'}
            src="/mypage/membership_table.png"
            className="pointer-none"
          />
        </InformationWrapperSection>
        <InformationWrapperSection>
          <Text>● 쿠폰 별 사용조건</Text>
          <Image
            width={'100%'}
            height={'auto'}
            src="/mypage/table_coupon.png"
            className="pointer-none"
          />
        </InformationWrapperSection>
      </InformationWrapper>
    </Template>
  );
};
MyPageMembershipPageTemplate.Mobile = MyPageMembershipPageTemplateMobile;

const InformationWrapper = styled.div`
  margin-left: 10px;
`;
const InformationWrapperSection = styled.div`
  margin: 30px 0;
  span {
    margin-bottom: 20px;
  }
`;
