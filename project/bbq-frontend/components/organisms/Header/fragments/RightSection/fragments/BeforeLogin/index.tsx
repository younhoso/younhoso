import { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import styled from 'styled-components';

import { Arrow, Divider, Flex, Icon, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import {
  COLOR_PRIMARY,
  FONTSIZE_12,
  FONTSIZE_16,
  FONTSIZE_17,
  FONTSIZE_18,
  PLANCK,
} from '@/constants';
import { useAuth, useQueryParams } from '@/hooks';

import { HeaderProps } from '../../../../Header';

const CouponWarnPopup = () => {
  const { closeModal } = useModal();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
        등록한 쿠폰은 모두 사용하셨나요?
      </Text>
      <Space.H4 />
      <Text size={FONTSIZE_16} lineHeight={'1.3em'} align="center" color="#666">
        로그인하시면 기존에 등록한
        <br />
        E-쿠폰, 상품권 정보는 모두 초기화되어
        <br />
        쿠폰 재등록이 필요합니다.
      </Text>
      <Space.H7 />
      <Button
        full
        color="red"
        shape="round"
        text="쿠폰 사용하고 로그인할게요"
        onClick={() => closeModal()}
        style={{ height: 50 }}
      />
      <Space.H2 />
      <Button
        full
        color="lightgray"
        shape="round"
        text="그냥 로그인할게요"
        onClick={() => {
          window.location.href = '/member/login';
        }}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};

interface BeforeLoginComponentProps extends HeaderProps {
  className?: string;
  [x: string]: any;
}

const BeforeLogin: FC<BeforeLoginComponentProps> = ({ className, ...rest }) => {
  const { keepParams } = useQueryParams();
  const router = useRouter();
  const { cartCount, defaultAddress, membershipCouponCount, ecouponCount } = useAuth();
  const { openModal } = useModal();

  return (
    <ContentBox className={classNames(className)} {...rest}>
      <Flex.RSC>
        <Menu>
          <Text
            weight={700}
            size={FONTSIZE_17}
            onClick={async () => {
              if ((membershipCouponCount ?? 0) > 0 || (ecouponCount ?? 0) > 0) {
                openModal({
                  title: '쿠폰 알림',
                  body: <CouponWarnPopup />,
                });
              } else {
                router.push('/member/login');
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            로그인
          </Text>
          <Space.V2 />
          <Divider direction="v" style={{ height: 12 }} />
          <Space.V2 />
          <Text.Link weight={700} size={FONTSIZE_17} href="/member/join/verify">
            회원가입
          </Text.Link>
        </Menu>
        <Space.V3_5 />
        <IconMenus>
          <IconMenu
            href={
              defaultAddress
                ? `/address/search?redirect_to=${encodeURIComponent(router.asPath)}`
                : `/address/permission?redirect_to=${encodeURIComponent(router.asPath)}`
            }
            count={!defaultAddress ? '?' : undefined}
          >
            <Icon src={'pin-black-line.svg'} size={27} />
          </IconMenu>{' '}
          <Space.V2_5 />
          <IconMenu
            href={{
              pathname: '/mypage',
            }}
          >
            <Icon src={'human-black-line.svg'} size={24} />
          </IconMenu>
          <Space.V2_5 />
          <IconMenu href={keepParams('/cart')} count={cartCount ?? 0}>
            <Icon src={'basket-bbq-black.svg'} size={26} />
          </IconMenu>
        </IconMenus>
      </Flex.RSC>
      <Space.H1_5 />
      <Link
        href="/mypage/address"
        style={{
          display: 'block',
          backgroundColor: '#f1f2f6',
          borderRadius: '10px',
          padding: '5px 0',
          width: '100%',
          maxWidth: 250,
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
    </ContentBox>
  );
};

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 ${PLANCK * 3}px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const IconMenus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconMenu = styled(Link)<{ count?: number | string }>`
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

export default BeforeLogin;
