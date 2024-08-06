import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';

export interface ContainerMobileComponentProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export interface ContainerMobileStickyBottomComponentProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export interface ContainerMobileBodyComponentProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const ContainerMobile: FC<ContainerMobileComponentProps> & {
  StickyBottom: React.FC<ContainerMobileStickyBottomComponentProps>;
  Body: React.FC<ContainerMobileBodyComponentProps>;
} = props => {
  const { className, children, ...rest } = props;

  return (
    <Wrapper className={classNames(className)} {...rest}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{}>`
  clear: both;
  width: 100%;
  display: block;
`;

ContainerMobile.StickyBottom = props => {
  const { className, children, ...rest } = props;

  return (
    <StickyBottomWrapper className={classNames(className)} {...rest}>
      {children}
    </StickyBottomWrapper>
  );
};

ContainerMobile.StickyBottom.displayName = 'ContainerMobile.StickyBottom';

const StickyBottomWrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
`;

ContainerMobile.Body = props => {
  const { className, children, ...rest } = props;

  return (
    <BodyWrapper className={classNames(className)} {...rest}>
      {children}
    </BodyWrapper>
  );
};
ContainerMobile.Body.displayName = 'ContainerMobile.Body';

const BodyWrapper = styled.div`
  width: 100%;
  padding: ${PLANCK * 4}px;
  box-sizing: border-box;
`;
