import { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Space } from '@/components/atoms';
import { HEADER_HEIGHT, TOP_BANNER_HEIGHT } from '@/constants';

import { WrapperComponentProps } from '.';

export const WrapperMobile: FC<WrapperComponentProps> = props => {
  const { className, children, ...rest } = props;

  return (
    <Main className={classNames(className)} {...rest}>
      <Space.H4 />
      {children}
    </Main>
  );
};

const Main = styled.div`
  background-color: #f8f9fa;
  min-height: calc(100vh - ${TOP_BANNER_HEIGHT + HEADER_HEIGHT}px);
`;
