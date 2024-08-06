import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Space } from '@/components/atoms';
import { PLANCK } from '@/constants';

import Buttons from './fragments/Buttons';
import Items from './fragments/Items';
import Title from './fragments/Title';

export interface OrderFormCardProps {}

export interface OrderFormCardComponentProps extends OrderFormCardProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const OrderFormCard: FC<OrderFormCardComponentProps> = props => {
  const { className, children, ...rest } = props;

  return (
    <Wrapper data-global-ref="sidebar-order-form-card">
      <Group>
        <Title />
        <Space.H3 />
        <Items />
        <Space.H3 />
        <Buttons />
      </Group>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  clear: both;
  width: 100%;
`;

const Group = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: ${PLANCK * 3}px;
`;
