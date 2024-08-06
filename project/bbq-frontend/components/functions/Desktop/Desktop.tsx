import React, { FC, RefAttributes } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { MOBILE_SCREEN_MAX_WIDTH } from '@/constants';
import { useMobile } from '@/hooks';
import { isArsSessionState } from '@/stores';

interface DesktopProps extends React.HTMLAttributes<HTMLDivElement> {
  useCss?: boolean;
}

const Desktop: FC<DesktopProps & RefAttributes<HTMLDivElement>> = props => {
  const { useCss = true, children, ...rest } = props;

  const isDesktop = !useMobile();
  const isArsSession = useRecoilValue(isArsSessionState);

  return useCss ? (
    <Container isArsSession={isArsSession} {...rest}>
      {children}
    </Container>
  ) : isDesktop ? (
    <>{children}</>
  ) : null;
};

const Container = styled.div<{ isArsSession: boolean }>`
  display: block;
  width: 100%;

  ${props =>
    props.isArsSession
      ? `display:none !important`
      : `@media only screen and (max-width: ${MOBILE_SCREEN_MAX_WIDTH}px) {
    display: none !important;
  }`}
`;

export default Desktop;
