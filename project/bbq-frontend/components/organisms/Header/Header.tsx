import { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Container, Divider } from '@/components/atoms';
import { COLOR_BACKGROUND, COLOR_BLACK, HEADER_HEIGHT } from '@/constants';

import CenterSection from './fragments/CenterSection';
import LeftSection from './fragments/LeftSection';
import RightSection from './fragments/RightSection';
import { HeaderMobile } from './mobile';

export interface HeaderProps {
  orderOrMall?: boolean;
  currentPageMenuIndex?: number;
}

export interface HeaderComponentProps extends HeaderProps {
  className?: string;
}

export const Header: FC<HeaderComponentProps> & {
  Mobile: FC<HeaderComponentProps>;
} = ({ className, ...rest }) => {
  return (
    <>
      <Wrapper className={classNames(className)} {...rest}>
        <HeaderContainer>
          <ContentBox>
            <LeftSection {...rest} />
            <CenterSection {...rest} />
            <Divider direction="v" />
            <RightSection {...rest} />
            <Divider direction="v" />
          </ContentBox>
        </HeaderContainer>
      </Wrapper>
    </>
  );
};

Header.Mobile = HeaderMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  border-bottom: ${COLOR_BLACK} 2px solid;
  background-color: ${COLOR_BACKGROUND};
`;

const HeaderContainer = styled(Container)`
  height: 100%;
  position: relative;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
`;
