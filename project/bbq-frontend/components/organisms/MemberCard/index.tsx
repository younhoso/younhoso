import { FC, ReactNode } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Arrow, Divider, Flex, Grid, Icon, Space, Text } from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_12, FONTSIZE_13, FONTSIZE_14, PLANCK } from '@/constants';

import { MemberCardMobile } from './mobile';

export interface MemberCardProps {}

export interface MemberCardComponentProps extends MemberCardProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const MemberCard: FC<MemberCardComponentProps> & {
  Mobile: FC<MemberCardComponentProps>;
} = props => {
  const { className, children, ...rest } = props;

  return (
    <Wrapper>
      <Flex layout="1 1px 1">
        <TopButton href="/mypage/points">
          <Flex.CCC>
            <Space.H3 />
            <Icon src={'point-delivery-bike.svg'} size={38} />
            <Space.H2 />
            <Text size={FONTSIZE_12} color={'#777777'}>
              BBQ 주문 포인트
            </Text>
            <Space.H1 />
            <Text size={FONTSIZE_14} color={COLOR_PRIMARY} weight={700}>
              1,890p
            </Text>
            <Space.H3 />
          </Flex.CCC>
        </TopButton>
        <Divider.V1S />
        <TopButton href="/mypage/coupons">
          <Flex.CCC>
            <Space.H3 />
            <Icon src={'double-coupon-45deg.svg'} size={38} />
            <Space.H2 />
            <Text size={FONTSIZE_12} color={'#777777'}>
              BBQ 주문 쿠폰
            </Text>
            <Space.H1 />
            <Text size={FONTSIZE_14} color={COLOR_PRIMARY}>
              5{' '}
              <Text inline={true} size={FONTSIZE_14} color={'#8e93ad'}>
                / 12
              </Text>
            </Text>
            <Space.H3 />
          </Flex.CCC>
        </TopButton>
      </Flex>
      <Divider.H1 />
      <Bottom>
        <Flex.RSC layout="auto 1 auto" gap={PLANCK * 2}>
          <Icon src={`pin-red.webp`} width={16} height={20} />
          <Text size={FONTSIZE_13} style={{ whiteSpace: 'nowrap', textOverflow: 'ellipis' }}>
            서울시 송파구 중대로 64 비비아파트 104동 ...
          </Text>
          <Arrow.Down size={2.5} />
        </Flex.RSC>
        <Space.H3 />
        <Grid columnCount={3} gap={PLANCK * 2}>
          <BottomButton href="/quickorder">
            <Flex.CCC>
              <Space.H2 />
              <Icon src={'delivery-bike-blue.svg'} size={34} />
              <Space.H1 />
              <Text size={FONTSIZE_12} color={'#324266'} weight={700}>
                퀵오더
              </Text>
              <Space.H1 />
              <Text size={FONTSIZE_12} color={COLOR_PRIMARY} weight={700}>
                3
                <Text inline={true} size={FONTSIZE_12} color={'#324266'} weight={700}>
                  개
                </Text>
              </Text>
              <Space.H2_5 />
            </Flex.CCC>
          </BottomButton>
          <BottomButton href="/mypage/orders">
            <Flex.CCC>
              <Space.H2 />
              <Icon src={'hand-ticket-blue.svg'} size={34} />
              <Space.H1 />
              <Text size={FONTSIZE_12} color={'#324266'} weight={700}>
                주문내역
              </Text>
              <Space.H1 />
              <Text size={FONTSIZE_12} color={COLOR_PRIMARY} weight={700}>
                17
                <Text inline={true} size={FONTSIZE_12} color={'#324266'} weight={700}>
                  건
                </Text>
              </Text>
              <Space.H2_5 />
            </Flex.CCC>
          </BottomButton>
          <BottomButton href="/events">
            <Flex.CCC>
              <Space.H2 />
              <Icon src={'fanfare-blue.svg'} width={26} height={34} />
              <Space.H1 />
              <Text size={FONTSIZE_12} color={'#324266'} weight={700}>
                이벤트
              </Text>
              <Space.H1 />
              <Text inline={true} size={FONTSIZE_12} color={COLOR_PRIMARY} weight={700}>
                (참여하기)
              </Text>
              <Space.H2_5 />
            </Flex.CCC>
          </BottomButton>
        </Grid>
      </Bottom>
    </Wrapper>
  );
};
MemberCard.Mobile = MemberCardMobile;

const Wrapper = styled.div``;

const TopButton = styled(Link)``;

const Bottom = styled.div`
  padding: ${PLANCK * 2.5}px;
`;

const BottomButton = styled(Link)`
  display: block;
  cursor: pointer;
  border-radius: 7px;
  border: solid 1px #e7e8ef;
  background-color: #f9fafb;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 0 2px ${COLOR_PRIMARY};
  }
`;
