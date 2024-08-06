import { FC, useCallback, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Flex, Image, Space } from '@/components/atoms';
import {
  COLOR_BACKGROUND,
  COLOR_BLACK,
  COLOR_PLACEHOLDER,
  COLOR_PRIMARY,
  MOBILE_HEADER_HEIGHT,
  PLANCK,
} from '@/constants';
import { useAuth, useQueryParams } from '@/hooks';
import { isArsSessionState } from '@/stores';

import { HeaderComponentProps } from '../Header';
import { MALL_URL } from '../fragments/LeftSection';
import Navigation from './fragments/Navigation';

export const HeaderMobile: FC<HeaderComponentProps> = ({ className, ...rest }) => {
  const router = useRouter();
  const { keepParams } = useQueryParams();
  const { cartCount, defaultAddress } = useAuth();

  const [navigationOpened, setNavigationOpened] = useState<boolean>(false);
  const hideNavigation = useCallback(() => {
    setNavigationOpened(false);
  }, [navigationOpened]);

  const isArs = useRecoilValue(isArsSessionState);

  return (
    <>
      <Ghost isArs={isArs} />
      <Wrapper className={classNames(className)} {...rest}>
        {!isArs ? (
          <HeaderToggleMobileStyled>
            <div className="toggle-deactive">BBQ 주문</div>
            <div className="toggle-active" onClick={() => (window.location.href = MALL_URL)}>
              <div className="new-wrapper">
                BBQ 몰
                <svg
                  width="5"
                  height="5"
                  viewBox="0 0 5 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="N"
                    d="M5 0V5H3.72392L1.56501 2.29972H1.52488V5H0V0H1.30016L3.42697 2.68646H3.47512V0H5Z"
                    fill="#bbb"
                  />
                </svg>
              </div>
            </div>
          </HeaderToggleMobileStyled>
        ) : (
          <VisalArsTitle>보이는 ARS</VisalArsTitle>
        )}
        <Flex.RSC full={true} layout="auto auto 1 auto">
          {!isArs ? (
            <HamburgerMenu
              data-global-ref="header-hamburger-menu"
              onClick={() => setNavigationOpened(true)}
            >
              <div></div>
              <div></div>
              <div></div>
            </HamburgerMenu>
          ) : (
            <div />
          )}
          <Link href="/" style={{ transform: 'translateY(10%)', marginLeft: '18px' }}>
            <Image src="symbols/logo-red.svg" height={28} />
          </Link>

          <Flex.REC>
            {!isArs && (
              <>
                <IconMenu
                  href={
                    defaultAddress
                      ? `/address/search?redirect_to=${encodeURIComponent(router.asPath)}`
                      : `/address/permission?redirect_to=${encodeURIComponent(router.asPath)}`
                  }
                  iconimageurl={'/images/icons/pin-black-line.svg'}
                  count={!defaultAddress ? '?' : undefined}
                />
                <Space.V3 />
                <IconMenu
                  href={{
                    pathname: '/mypage',
                  }}
                  iconimageurl={'/images/icons/human-black-line.svg'}
                  sizeratio={0.85}
                  className="remove-when-narrow"
                />
              </>
            )}
            <IconMenu
              href={
                router.pathname === '/cart' || router.pathname === '/checkout'
                  ? keepParams('/cart')
                  : '/cart'
              }
              iconimageurl={'/images/icons/basket-bbq-black.svg'}
              count={cartCount ?? 0}
            />
          </Flex.REC>
          <Space.V4 />
        </Flex.RSC>
      </Wrapper>
      <Navigation onClose={hideNavigation} navigationOpened={navigationOpened} />
    </>
  );
};

export const VisalArsTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 600;
`;

export const HeaderToggleMobileStyled = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 144px;
  height: 28px;
  background-color: #f5f5f5;
  border-radius: 3012px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  .toggle-deactive {
    width: 72px;
    color: white;
    background-color: #e31937;
    height: 28px;
    border-radius: 3012px;
    line-height: 28px;
  }

  .toggle-active {
    width: 72px;
    color: #bbb;
    .new-wrapper {
      position: relative;
      line-height: 28px;

      > svg {
        position: absolute;
        right: 10px;
        top: 6px;
      }
    }
  }
  @media (max-width: 400px) {
    width: 114px;
    font-size: 12px;

    .toggle-active {
      .new-wrapper {
        > svg {
          right: 5px;
        }
      }
    }
  }
`;

const Ghost = styled.div<{ isArs: boolean }>`
  height: ${props => (props.isArs ? '52px' : '74px')};
  width: 100%;
  clear: both;
  display: block;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  clear: both;
  width: 100%;
  height: ${MOBILE_HEADER_HEIGHT}px;
  border-bottom: ${COLOR_BLACK} 2px solid;
  background-color: ${COLOR_BACKGROUND};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
`;

const HamburgerMenu = styled.div`
  width: ${18 + PLANCK * 8}px;
  height: 100%;
  position: relative;
  margin-right: -18px;

  @media (max-width: 360px) {
    width: ${PLANCK * 8}px;
  }
  @media (max-width: 300px) {
    width: ${PLANCK * 6}px;
  }

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 2px;
    background-color: ${COLOR_BLACK};
    border-radius: 9999px;
  }

  & > *:nth-child(1) {
    transform: translate(-50%, -50%) translateY(-6px);
  }
  & > *:nth-child(2) {
  }
  & > *:nth-child(3) {
    transform: translate(-50%, -50%) translateY(6px);
  }
`;

const IconMenu = styled(Link)<{
  iconimageurl?: string;
  count?: number | string;
  sizeratio?: number;
}>`
  position: relative;
  width: ${({ sizeratio }) => 28 * (sizeratio ?? 1)}px;
  height: ${({ sizeratio }) => 28 * (sizeratio ?? 1)}px;

  ${({ iconimageurl }) =>
    iconimageurl && iconimageurl.length
      ? `
      background-image: url(${iconimageurl});
      `
      : `
      background-color: ${COLOR_PLACEHOLDER};
      border-radius: 50%;
  `}
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${({ count }) =>
    count &&
    `
  &::after {
    content: "${count}";
    display: block;
    border-radius: 50%;
    background-color: ${COLOR_PRIMARY};
    width: 20px;
    height: 20px;
    position: absolute;
    transform: translate(50%, -40%);
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: 11px;
    line-height: 1em;
    border:1px solid white;
  }
  `}

  &.remove-when-narrow {
    margin-right: 15px;
    @media (max-width: 360px) {
      margin-right: 0;
      display: none;
    }
  }
`;
