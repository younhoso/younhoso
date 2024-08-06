import React, { FC, ReactNode } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Space } from '../Space';
import { TabMobile } from './mobile';

export interface TabProps {
  items: { title: string; href: string; selected: boolean }[];
}

export interface TabComponentProps extends TabProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Tab: FC<TabComponentProps> & { Mobile: FC<TabComponentProps> } = ({
  items,
  className,
  children,
  ...rest
}) => {
  return (
    <Wrapper className={classNames(className)} {...rest}>
      <Menu>
        {items.map((item, index) => (
          <MenuItem key={`tab-menu-item-${index}`} selected={item.selected} href={item.href}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      <Space.H4 />
      {children}
    </Wrapper>
  );
};
Tab.Mobile = TabMobile;

const Wrapper = styled.div`
  border: solid 1px #ddd;
  background-color: #fff;
`;

const Menu = styled.div`
  display: flex;
  width: 100%;
`;

const MenuItem = styled(Link)<{ selected?: boolean }>`
  flex: 1;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  height: 50px;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  background-color: #f3f5f6;
  color: #777777;
  cursor: pointer;

  &:not(:nth-child(1)) {
    border-left: 1px solid #ddd;
  }

  ${props =>
    props.selected &&
    `
    background-color:#fff;
    border-bottom:0;
    color: black;
  `}
`;
