import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { TabComponentProps } from './Tab';

export const TabMobile: FC<TabComponentProps> = ({ items, className, children, ...rest }) => {
  return (
    <Wrapper className={classNames(className)} {...rest}>
      <Menu>
        {items.map((item, index) => (
          <MenuItem key={`tab-menu-item-${index}`} selected={item.selected} href={item.href}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      {children}
    </Wrapper>
  );
};

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
  height: 45px;
  display: flex;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  background-color: #f3f5f6;
  color: #777777;
  cursor: pointer;
  font-size: 14px;

  &:not(:nth-child(1)) {
    border-left: 1px solid #ddd;
  }

  ${props =>
    props.selected &&
    `
    background-color:#fff;
    border-bottom:0;
    font-size:14px;
    color: black;
  `}
`;
