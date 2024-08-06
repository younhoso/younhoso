import { FC } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Flex, Space, Text } from '@/components/atoms';
import {
  COLOR_WHITE,
  FONTSIZE_14,
  FONTSIZE_18,
  FONTSIZE_24,
  HEADER_HEIGHT,
  PLANCK,
} from '@/constants';

import { CheckoutCompletePageTemplateComponentProps } from './CheckoutCompletePageTemplate';

export const CheckoutCompletePageTemplateMobile: FC<
  CheckoutCompletePageTemplateComponentProps
> = props => {
  return (
    <Wrapper>
      <Flex.CCC>
        <Space.H10 />
        <Text size={FONTSIZE_24}>주문 확인중</Text>
        <Space.H5 />
        <Bullets>
          <Bullet />
          <Bullet />
          <Bullet />
          <Bullet />
          <Bullet />
        </Bullets>
        <Space.H7 />
        <Text size={FONTSIZE_18} color={'#494949'}>
          패밀리점에서 주문 확인 중이에요
        </Text>
        <Space.H5 />
        <Text size={FONTSIZE_14} align="center" color={'#494949'} lineHeight={'1.35em'}>
          주문 상황은 주문내역에서 언제든
          <br />
          확인하실 수 있습니다.
        </Text>
        <Space.H6 />
        <Flex.RSC gap={PLANCK * 2}>
          <Button href="/mypage/orders">주문 내역 보기</Button>
          <Button href="/">홈으로</Button>
        </Flex.RSC>
      </Flex.CCC>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f9f6ef;
  min-height: 85vh;
  background-image: url(/images/checkout/complete/background.svg);
  background-repeat: no-repeat;
  background-position: center 80%;
  background-size: auto 70%;
`;

const Bullets = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:nth-child(1)) {
    margin-left: ${PLANCK * 1}px;
  }

  & > * {
    &:nth-child(1) {
      opacity: 0.2;
    }
    &:nth-child(2) {
      opacity: 0.4;
    }
    &:nth-child(3) {
      opacity: 0.6;
    }
    &:nth-child(4) {
      opacity: 0.8;
    }
  }
`;

const Bullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #494949;
`;

const Button = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  width: 105px;
  height: 37px;
  background-color: ${COLOR_WHITE};
  border: 2px solid #434448;
  font-size: ${FONTSIZE_14}px;
  font-weight: 600;
  color: #434448;
`;
