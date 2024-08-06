import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Space } from '@/components/atoms';
import { HEADER_HEIGHT, TOP_BANNER_HEIGHT } from '@/constants';

import { WrapperMobile } from './mobile';

export interface WrapperProps {}

export interface WrapperComponentProps extends WrapperProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Wrapper: FC<WrapperComponentProps> & {
  Mobile: FC<WrapperComponentProps>;
} = props => {
  const { className, children, ...rest } = props;

  return (
    <Main className={classNames(className)} {...rest}>
      <Space.H8 />
      {children}
    </Main>
  );
};
Wrapper.Mobile = WrapperMobile;

const Main = styled.div`
  background-color: #f8f9fa;
  min-height: calc(100vh - ${TOP_BANNER_HEIGHT + HEADER_HEIGHT}px);
`;
