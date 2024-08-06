import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK, SIDEBAR_WIDTH } from '@/constants';

import {
  ContainerMobile,
  ContainerMobileBodyComponentProps,
  ContainerMobileComponentProps,
  ContainerMobileStickyBottomComponentProps,
} from './mobile';

type FlexDirection = 'horizontal' | 'vertical' | 'h' | 'v';

export interface ContainerComponentProps {
  center?: boolean | false;
  flexDirection?: FlexDirection;
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export interface ContainerSidebarComponentProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export interface ContainerBodyComponentProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Container: FC<ContainerComponentProps> & {
  Sidebar: React.FC<ContainerSidebarComponentProps>;
  Body: React.FC<ContainerBodyComponentProps>;
} & {
  Mobile: FC<ContainerMobileComponentProps> & {
    StickyBottom: React.FC<ContainerMobileStickyBottomComponentProps>;
    Body: React.FC<ContainerMobileBodyComponentProps>;
  };
} = props => {
  const { flexDirection, className, children, center, ...rest } = props;

  return (
    <Wrapper
      center={center ?? false}
      className={classNames(className)}
      flexDirection={flexDirection ?? 'horizontal'}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};
Container.Mobile = ContainerMobile;

const Wrapper = styled.div<{ flexDirection: FlexDirection; center: boolean }>`
  display: flex;
  flex-direction: ${props =>
    ['horizontal', 'h'].includes(props.flexDirection) ? 'row' : 'column'};
  clear: both;
  width: 100%;
  height: auto;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  align-items: ${({ center }) => (center ? 'center' : 'inherit')};
  justify-content: ${({ center }) => (center ? 'center' : 'inherit')};
  text-align: ${({ center }) => (center ? 'center' : 'inherit')};
`;

Container.Sidebar = props => {
  const { className, children, ...rest } = props;

  return (
    <SidebarWrapper className={classNames(className)} {...rest}>
      {children}
    </SidebarWrapper>
  );
};

Container.Sidebar.displayName = 'Container.Sidebar';

const SidebarWrapper = styled.div`
  display: block;
  clear: both;
  width: 100%;
  max-width: ${SIDEBAR_WIDTH}px;
  margin-left: auto;
  margin-right: auto;
`;

Container.Body = props => {
  const { className, children, ...rest } = props;

  return (
    <BodyWrapper className={classNames(className)} {...rest}>
      {children}
    </BodyWrapper>
  );
};

Container.Body.displayName = 'Container.Body';

const BodyWrapper = styled.div`
  display: block;
  flex: 1;
  padding-right: ${PLANCK * 3}px;
  box-sizing: border-box;
  clear: both;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
