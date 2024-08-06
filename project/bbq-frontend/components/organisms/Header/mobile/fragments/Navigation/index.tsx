import { signOut } from 'next-auth/react';
import { FC, useMemo } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import styled from 'styled-components';

import { Arrow, Box, Divider, Flex, Grid, Icon, Image, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import {
  COLOR_DIVIDER,
  COLOR_PRIMARY,
  COLOR_RED,
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_15,
  FONTSIZE_16,
  FONTSIZE_18,
  FONTSIZE_20,
  PLANCK,
} from '@/constants';
import { useAuth, useCookie, useQueryParams } from '@/hooks';
import { useSidebarCart } from '@/stores';
import { MealTypeEnum } from '@/types';

import { HeaderProps } from '../../../Header';

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

interface NavigationProps extends HeaderProps {
  onClose: () => void;
  navigationOpened: boolean;
}

interface NavigationComponentProps extends NavigationProps {
  className?: string;
  [x: string]: any;
}

const Navigation: FC<NavigationComponentProps> = ({
  navigationOpened,
  onClose,
  className,
  ...rest
}) => {
  const router = useRouter();
  const { keepParams } = useQueryParams();
  const { member, defaultAddress, grade, membershipCouponCount, ecouponCount } = useAuth();
  const { reset: resetCookies } = useCookie();
  const { reset: resetSidebarCart } = useSidebarCart();
  const { openModal } = useModal();

  const {
    query: {
      ecouponAction: queryEcouponAction,
      ecouponActionValue: queryEcouponActionValue,
      ecoupons,
    },
  } = useRouter();
  const isActionForECouponChangeMenu = useMemo<boolean>(() => {
    return !!(
      (queryEcouponAction as string) === 'change' && (queryEcouponActionValue as string).length
    );
  }, [queryEcouponAction, queryEcouponActionValue]);

  return (
    <>
      <Dim visible={navigationOpened ? 'true' : 'false'} onClick={() => onClose()} />
      <Wrapper
        opened={navigationOpened ? 'true' : 'false'}
        className={classNames(className)}
        {...rest}
      >
        <Head>
          <Flex.RSC layout="auto 1 auto" full style={{ height: '100%' }}>
            <Space.V4 />
            <Link
              href="/mypage/address"
              style={{
                display: 'block',
                backgroundColor: '#f1f2f6',
                borderRadius: '10px',
                padding: '5px 0',
                position: 'relative',
                width: '100%',
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
            <Flex.RCC
              style={{ width: 55, height: '100%', cursor: 'pointer' }}
              onClick={() => onClose()}
            >
              <Icon src={'close-black.svg'} size={13} />
            </Flex.RCC>
          </Flex.RSC>
        </Head>
        <SubHead>
          <Grid columnCount={2} gap={PLANCK * 3}>
            <Card
              data-global-ref="order-method-card-delivery"
              selected={
                `${router.query.mealType}`.toUpperCase() === MealTypeEnum.Delivery ? true : false
              }
              onClick={() => {
                let param = '';
                if (isActionForECouponChangeMenu) {
                  param = `&ecouponAction=${queryEcouponAction}&ecouponActionValue=${queryEcouponActionValue}&ecoupons=${ecoupons}`;
                }
                const deliveryHref =
                  (router.pathname.startsWith('/products/') ||
                  router.pathname.startsWith('/categories/')
                    ? router.asPath.split('?')[0]
                    : `/categories/1`) +
                  `?mealType=${MealTypeEnum.Delivery.toLowerCase()}` +
                  param;

                router.push(
                  defaultAddress
                    ? deliveryHref
                    : `/address/permission?redirect_to=${encodeURIComponent(deliveryHref)}`,
                );
                onClose();
              }}
            >
              <CardIconWrapper>
                <Icon src={'delivery-bike.svg'} size={38} />
              </CardIconWrapper>
              <CardTitleText>배달</CardTitleText>
              <CardSubtitleText>DELIVERY</CardSubtitleText>
            </Card>
            <Card
              data-global-ref="order-method-card-takeout"
              selected={
                `${router.query.mealType}`.toUpperCase() === MealTypeEnum.Takeout ? true : false
              }
              onClick={() => {
                let param = '';

                if (isActionForECouponChangeMenu) {
                  param = `?ecouponAction=${queryEcouponAction}&ecouponActionValue=${queryEcouponActionValue}&ecoupons=${ecoupons}`;
                }
                router.push(
                  `/stores/map?for=takeout&redirect_to=${encodeURIComponent(
                    (router.pathname.startsWith('/products/') ||
                    router.pathname.startsWith('/categories/')
                      ? router.asPath.split('?')[0]
                      : `/categories/1`) + param,
                  )}`,
                );
                onClose();
              }}
            >
              <CardIconWrapper>
                <Icon src={'chicken-packaging.svg'} size={36} />
              </CardIconWrapper>
              <CardTitleText>포장</CardTitleText>
              <CardSubtitleText>PACKAGING</CardSubtitleText>
            </Card>
          </Grid>
        </SubHead>

        <Body>
          <Box padding={PLANCK * 3.5}>
            <Divider.H1 />
            <Space.H3_5 />
            <Grid columnCount={1} gap={PLANCK * 3}>
              {[
                {
                  iconSrc: 'chicken-packaging.svg',
                  title: '메뉴',
                  href: keepParams('/categories/1'),
                },
                {
                  iconSrc: 'bbq-store.svg',
                  title: '매장 찾기',
                  href: {
                    pathname: `/stores/map`,
                    query: {
                      ...(router.pathname.startsWith('/cart') ||
                      router.pathname.startsWith('/checkout')
                        ? { redirect_to: router.asPath }
                        : {}),
                    },
                  },
                },
                ...(member
                  ? [
                      {
                        iconSrc: 'delivery-bike.svg',
                        title: '퀵오더',
                        href: {
                          pathname: `/quickorder`,
                        },
                      },
                    ]
                  : []),
              ].map((item, index) => (
                <Link key={index} href={item.href} onClick={() => onClose()}>
                  <Flex.RSC full={true} layout={'auto auto 1'}>
                    <Icon src={item.iconSrc} size={22} />
                    <Space.V2 />
                    <Text>{item.title}</Text>
                  </Flex.RSC>
                </Link>
              ))}
            </Grid>
            <Space.H3_5 />
            <Divider.H1 />
            <Space.H3_5 />
            <Grid columnCount={1} gap={PLANCK * 3}>
              {[
                {
                  iconSrc: 'mobile-nav-temp-icons/1.png',
                  title: '마이 페이지',
                  href: '/mypage',
                },
                ...(member
                  ? [
                      {
                        iconSrc: 'mobile-nav-temp-icons/2.png',
                        title: '포인트',
                        href: '/mypage/points',
                      },
                    ]
                  : []),
                {
                  iconSrc: 'mobile-nav-temp-icons/3.png',
                  title: '쿠폰',
                  href: '/mypage/coupons',
                },
              ].map((item, index) => (
                <Link key={index} href={item.href} onClick={() => onClose()}>
                  <Flex.RSC full={true} layout={'auto auto 1'}>
                    <Icon src={item.iconSrc} size={22} />
                    <Space.V2 />
                    <Text>{item.title}</Text>
                  </Flex.RSC>
                </Link>
              ))}
            </Grid>
            <Space.H3_5 />
            <Divider.H1 />
            <Space.H3_5 />
            <Grid columnCount={1} gap={PLANCK * 3}>
              {[
                /*{
                  iconSrc: "mobile-nav-temp-icons/4.png",
                  title: "브랜드",
                  href: "/story",
                },*/
                {
                  iconSrc: 'mobile-nav-temp-icons/5.png',
                  title: '창업정보',
                  href: 'https://www.bbqopen.co.kr/?utm_campaign=homepage&utm_source=homepage%5Fmobile&utm_medium=sidebarbutton&utm_term=homepage%5Fsidebarbutton',
                },
                {
                  iconSrc: 'mobile-nav-temp-icons/6.png',
                  title: '이용안내',
                  href: '/mypage/guide',
                },
              ].map((item, index) => (
                <Link key={index} href={item.href} onClick={() => onClose()}>
                  <Flex.RSC full={true} layout={'auto auto 1'}>
                    <Icon src={item.iconSrc} size={22} />
                    <Space.V2 />
                    <Text>{item.title}</Text>
                  </Flex.RSC>
                </Link>
              ))}
            </Grid>
            {member ? (
              <>
                <Space.H3_5 />
                <Divider.H1 />
                <Space.H3_5 />
                <Flex.RSC>
                  <Link href="/mypage">
                    <Text size={FONTSIZE_15} weight={600}>
                      {member.name}님
                    </Text>
                  </Link>
                  {grade ? (
                    <>
                      <Space.V1_5 />
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
                    </>
                  ) : null}
                  <Space.V2_5 />
                  <Divider.V1 style={{ height: 12 }} />
                  <Space.V2_5 />
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
              </>
            ) : (
              <>
                <Space.H3_5 />
                <Divider.H1 />
                <Space.H3_5 />
                <Flex.RSC gap={PLANCK * 3}>
                  <Text
                    onClick={async () => {
                      if ((membershipCouponCount ?? 0) > 0 || (ecouponCount ?? 0) > 0) {
                        openModal({
                          title: '쿠폰 알림',
                          body: <CouponWarnPopup />,
                        });
                        onClose();
                      } else {
                        router.push('/member/login');
                        onClose();
                      }
                    }}
                    size={FONTSIZE_13}
                    color={'#777777'}
                    style={{ cursor: 'pointer' }}
                  >
                    로그인
                  </Text>
                  <Text
                    onClick={async () => {
                      router.push('/member/join/verify');
                      onClose();
                    }}
                    size={FONTSIZE_13}
                    color={'#777777'}
                  >
                    회원가입
                  </Text>
                </Flex.RSC>
              </>
            )}
          </Box>
        </Body>

        <Foot>
          <Box padding={PLANCK * 3.5}>
            <Flex.RSC layout="auto auto 1">
              <FootIconWrapper>
                <Icon src="phone-filled-primary.svg" size={20} />
              </FootIconWrapper>
              <Space.V2_5 />
              <div>
                <Text size={FONTSIZE_14} color={COLOR_WHITE}>
                  전화주문
                </Text>
                <Space.H1 />
                <Text size={FONTSIZE_20} color={COLOR_WHITE} weight={700}>
                  1588-9282
                </Text>
              </div>
            </Flex.RSC>
            <Space.H4 />
            <Text size={FONTSIZE_12} color={COLOR_WHITE} style={{ opacity: 0.5 }}>
              Copyright 2019 Ⓒ GENESIS BBQ
            </Text>
            <Space.H2 />
          </Box>
        </Foot>
      </Wrapper>
    </>
  );
};

const Dim = styled.div<{ visible: 'true' | 'false' }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 18;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.4s;

  ${({ visible }) => {
    if (visible === 'true') {
      return `opacity: 1; `;
    } else {
      return `opacity: 0; pointer-events:none;`;
    }
  }}
`;

const Wrapper = styled.div<{ opened: 'true' | 'false' }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 300px;
  max-width: calc(100vw - ${PLANCK * 4}px);
  z-index: 19;
  background-color: white;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s;

  ${({ opened }) => {
    if (opened === 'true') {
      return `transform: translateX(0);`;
    } else {
      return `transform: translateX(-105%); pointer-events:none;`;
    }
  }}
`;

const Head = styled.div`
  height: 55px;
`;

const SubHead = styled.div`
  height: 102px;
  padding: 0 ${PLANCK * 3}px;
`;

const Body = styled.div`
  height: calc(100vh - 55px - 102px - 122px);
  overflow-y: scroll;
`;

const Foot = styled.div`
  background-color: ${COLOR_PRIMARY};
  width: 100%;
  height: 122px;
`;

const Card = styled.div<{ selected?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${PLANCK * 2}px 0 ${PLANCK * 2.5}px 0;
  border-radius: 7px;
  border: 1px solid ${COLOR_DIVIDER};
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  transition: box-shadow 0.2s;

  & > * {
    transition: filter 0.2s;
  }

  ${({ selected }) => (selected ? `box-shadow: 0 0 0 3px #b92c35;` : ``)}
`;

const CardIconWrapper = styled.div`
  width: 52px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitleText = styled.div`
  margin-top: ${PLANCK}px;
  font-size: 19px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: #281d19;
`;

const CardSubtitleText = styled.div`
  margin-top: ${PLANCK}px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: #8e93ad;
`;

const FootIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR_WHITE};
  border-radius: 50%;
  width: 45px;
  height: 45px;
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

export default Navigation;
