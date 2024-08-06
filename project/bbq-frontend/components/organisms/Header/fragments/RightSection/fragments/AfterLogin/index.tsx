import { signOut } from 'next-auth/react';
import { FC } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Arrow, Box, Divider, Flex, Icon, Image, Space, Text } from '@/components/atoms';
import {
  COLOR_PRIMARY,
  COLOR_RED,
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_16,
  PLANCK,
} from '@/constants';
import { useAuth, useCookie, useQueryParams } from '@/hooks';
import { useSidebarCart } from '@/stores';

import { HeaderProps } from '../../../../Header';

interface AfterLoginComponentProps extends HeaderProps {}

const AfterLogin: FC<AfterLoginComponentProps> = ({}) => {
  const { keepParams } = useQueryParams();
  const { reset: resetCookies } = useCookie();
  const { reset: resetSidebarCart } = useSidebarCart();
  const {
    member,
    defaultAddress,
    cartCount,
    pointAmount,
    membershipCouponCount,
    ecouponCount,
    grade,
  } = useAuth();

  if (!member) {
    return null;
  }

  return (
    <Box full={true} padding={PLANCK * 3}>
      <Wrapper>
        <Flex.RBC>
          <Flex.RSC>
            <Link href="/mypage">
              <Text size={FONTSIZE_16} weight={600}>
                {member.name}님
              </Text>
            </Link>
            {grade ? (
              <>
                <Space.V1_5 />
                <Link href="/mypage/membership">
                  <GradeTag>
                    <GradeTagIconBox>
                      <Image
                        src={grade.iconUrl ?? ''}
                        size={12}
                        backgroundPosition="center"
                        backgroundSize="contain"
                      />
                    </GradeTagIconBox>
                    <GradeTagTextBox>
                      <Text color={COLOR_WHITE} weight={700} size={FONTSIZE_11}>
                        {grade.name ?? '알 수 없음'}
                      </Text>
                    </GradeTagTextBox>
                  </GradeTag>
                </Link>
              </>
            ) : null}
            <Space.V2 />
            <Divider.V1 style={{ height: 12 }} />
            <Space.V2 />
            <Text
              onClick={async () => {
                await signOut();
                resetCookies();
                resetSidebarCart();
                window.location.reload();
              }}
              size={FONTSIZE_13}
              color={'#777777'}
              style={{ cursor: 'pointer' }}
            >
              로그아웃
            </Text>
          </Flex.RSC>
          <IconMenu href={keepParams('/cart')} count={cartCount ?? 0}>
            <Icon src={'basket-bbq-black.svg'} size={22} />
          </IconMenu>
        </Flex.RBC>
        <Space.H2 />
        <Flex.RSC layout="auto auto 1">
          <Link
            href="/mypage/address"
            style={{
              display: 'block',
              backgroundColor: '#f1f2f6',
              borderRadius: '10px',
              padding: '5px 0',
              width: '100%',
              position: 'relative',
            }}
          >
            <Flex.RSC full layout="auto auto auto 1 auto auto">
              <Space.V1_5 />
              <Icon src={'pin-black.svg'} size={12} />
              <Space.V1 />
              <Text
                size={FONTSIZE_12}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {defaultAddress
                  ? `${defaultAddress.fullAddress} ${defaultAddress.detailAddress}`
                  : `(기본 주소 없음)`}
              </Text>
              <Arrow.Right size={2.5} thickness={1.5} />
              <Space.V2 />
            </Flex.RSC>
          </Link>
        </Flex.RSC>
        <Space.H2_5 />
        <Flex.RSC>
          <Link href="/mypage/points">
            <Text size={FONTSIZE_13}>
              포인트{' '}
              <span style={{ color: COLOR_PRIMARY }}>{(pointAmount ?? 0).toLocaleString()}p</span>
            </Text>
          </Link>
          <Space.V2 />
          <Divider.V1 style={{ height: 12 }} />
          <Space.V2 />
          <Link href="/mypage/coupons/1">
            <Text size={FONTSIZE_13}>
              멤버십 쿠폰{' '}
              <span style={{ color: COLOR_PRIMARY }}>
                {(membershipCouponCount ?? 0).toLocaleString()}
              </span>
            </Text>
          </Link>
          <Space.V2 />
          <Divider.V1 style={{ height: 12 }} />
          <Space.V2 />
          <Link href="/mypage/coupons/3">
            <Text size={FONTSIZE_13}>
              e-쿠폰{' '}
              <span style={{ color: COLOR_PRIMARY }}>{(ecouponCount ?? 0).toLocaleString()}</span>
            </Text>
          </Link>
        </Flex.RSC>
      </Wrapper>
    </Box>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const IconMenu = styled(Link)<{ count?: number }>`
  position: relative;

  ${({ count }) =>
    count &&
    `
  &::after {
    content: "${count}";
    display: block;
    border-radius: 50%;
    background-color: ${COLOR_PRIMARY};
    width: 18px;
    height: 18px;
    position: absolute;
    transform: translate(50%, -40%);
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 11px;
    line-height: 1em;
    border:1px solid white;
  }
  `}
`;

const GradeTag = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${COLOR_RED};
  border-radius: 9999px;
`;

const GradeTagIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 100%;
`;

const GradeTagTextBox = styled.div`
  padding-left: ${PLANCK}px;
  padding-right: ${PLANCK * 2}px;
`;

export default AfterLogin;
