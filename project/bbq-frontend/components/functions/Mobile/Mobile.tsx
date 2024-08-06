import React, { FC, RefAttributes } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { MOBILE_SCREEN_MAX_WIDTH } from '@/constants';
import { useMobile } from '@/hooks';
import { isArsSessionState } from '@/stores';

interface MobileProps extends React.HTMLAttributes<HTMLDivElement> {
  useCss?: boolean;
}

const Mobile: FC<MobileProps & RefAttributes<HTMLDivElement>> = props => {
  const { useCss = true, children, ...rest } = props;

  const isMobile = useMobile();
  const isArsSession = useRecoilValue(isArsSessionState);

  return useCss ? (
    <Container isArsSession={isArsSession} {...rest}>
      {children}
    </Container>
  ) : isMobile ? (
    <>{children}</>
  ) : null;
};

const Container = styled.div<{ isArsSession: boolean }>`
  display: block;
  width: 100%;

  ${props =>
    props.isArsSession
      ? `display:block !important`
      : ` @media only screen and (min-width: ${MOBILE_SCREEN_MAX_WIDTH + 1}px) {
    display: none !important;
  }`}
`;

export default Mobile;
