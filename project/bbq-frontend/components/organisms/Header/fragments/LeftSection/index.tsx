import { FC, useCallback } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Space } from '@/components/atoms';

import { HeaderProps } from '../../Header';

export interface HeaderLeftSectionComponentProps extends HeaderProps {
  className?: string;
  [x: string]: any;
}

export const MALL_URL = 'https://mall.bbq.co.kr/';

const HeaderLeftSection: FC<HeaderLeftSectionComponentProps> = ({
  orderOrMall,
  currentPageMenuIndex,
  className,
  ...rest
}) => {
  return (
    <Wrapper className={classNames(className)} {...rest}>
      <Logo href="/" />

      <Space.V8 />

      <HeaderToggleStyled>
        <div className="mall">BBQ주문</div>
        <div className="app" onClick={() => (window.location.href = MALL_URL)}>
          <div className="new-wrapper">
            BBQ몰
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
                fill="#b5b5b5"
              />
            </svg>
          </div>
        </div>
      </HeaderToggleStyled>
    </Wrapper>
  );
};

const HeaderToggleStyled = styled.div`
  width: 155px;
  height: 48px;
  border-radius: 3012px;
  background-color: #f6f6f6;
  border: 1px solid #eaeaea;

  display: flex;
  align-items: center;
  padding: 2px;
  text-align: center;
  justify-content: space-between;
  font-size: 16px;

  .app {
    width: 60px;
    margin-left: 4px;
    color: #b5b5b5;
    font-weight: 500;
    cursor: pointer;

    .new-wrapper {
      position: relative;
      line-height: 44px;

      > svg {
        position: absolute;
        right: 3px;
        top: 13px;
      }
    }
  }

  .mall {
    width: 83px;
    border-radius: 3012px;
    font-weight: 600;
    height: 44px;
    line-height: 44px;
    background-color: #e31937;
    color: white;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const Logo = styled(Link)`
  display: block;
  width: 76px;
  height: 34px;
  background-image: url('/images/symbols/logo-red.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Switch = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 184px;
  height: 40px;
  border-radius: 9999px;
  background-color: #b92c35;

  &::before,
  &::after {
    color: #f9bfc3;
    line-height: 1em;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.5px;
  }

  &::before {
    content: 'BBQ 주문';
    position: absolute;
    left: 27%;
    white-space: nowrap;
    transform: translateX(-50%);
  }
  &::after {
    content: 'BBQ 몰';
    position: absolute;
    left: 73%;
    white-space: nowrap;
    transform: translateX(-50%);
  }
`;

const Controller = styled.div<{ right: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 34px;
  width: 89px;
  top: 3px;
  border-radius: 9999px;
  box-shadow: 0.7px 0.7px 3px 0 rgba(1, 1, 1, 0.25);
  background-color: white;
  z-index: 1;

  ${props =>
    props.right
      ? `
      right: 3px;
      `
      : `
      left: 3px;
      `}

  &::after {
    content: '${props => (props.right ? `BBQ 몰` : `BBQ 주문`)}';
    display: block;
    line-height: 1em;
    font-weight: 700;
    font-size: 16px;
    color: black;
  }
`;

export default HeaderLeftSection;
