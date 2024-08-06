import React, { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';

import classNames from 'classnames';
import styled, { css } from 'styled-components';

import { Text } from '@/components/atoms';
import { COLOR_BLACK, FONTSIZE_17 } from '@/constants';

import { TabBoxMobile } from './mobile';

export interface TabBoxProps {
  tabs?: {
    name: string;
    url: string;
    selected: boolean;
  }[];
}

export interface TabBoxComponentProps extends TabBoxProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const TabBox: FC<TabBoxComponentProps> & {
  Mobile: FC<TabBoxComponentProps>;
} = props => {
  const { tabs, className, children, ...rest } = props;

  const router = useRouter();

  return (
    <Wrapper className={classNames(className)} {...rest}>
      {tabs && tabs.length ? (
        <Tab>
          {tabs.map((tab, index) => {
            return (
              <TabItem key={index} onClick={() => router.push(tab.url)} active={tab.selected}>
                <TabTextWrapper active={tab.selected}>
                  <Text size={FONTSIZE_17} color={tab.selected ? COLOR_BLACK : '#777777'}>
                    {tab.name}
                  </Text>
                </TabTextWrapper>
              </TabItem>
            );
          })}
        </Tab>
      ) : null}
      <InnerBox>{children}</InnerBox>
    </Wrapper>
  );
};
TabBox.Mobile = TabBoxMobile;

const Wrapper = styled.div`
  border-radius: 7px;
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #c8cde0;
  overflow: hidden;
  background-color: #ffffff;
  width: 420px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background-color: #f1f2f3;
`;

const TabItem = styled.div<{ active?: boolean }>`
  flex: 1;

  ${({ active }) => {
    if (active) {
      return css`
        :first-child {
          background-color: #e7e8e9;
        }

        :first-child > * {
          position: relative;
          border-radius: 0 7px 0 0;
          z-index: 1;

          &::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            width: 7px;
            height: calc(100% - 3.5px);
            border-radius: 0 7px 0 0;
            box-shadow: 1px 0 0 #c8cde0;
          }
        }
      `;
    } else {
      return css`
        :first-child {
          background-color: #fff;
        }

        :first-child > * {
          position: relative;
          border-radius: 0 0 7px 0;

          &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 0 0 7px 0;
            box-shadow: inset -3px -3px 5px rgba(0, 0, 0, 0.05);
          }

          &::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            bottom: 1px;
            width: 100%;
            height: 5.5px;
            border-radius: 0 0 7px 0;
            box-shadow: 0 1px 0 #c8cde0;
          }
        }
      `;
    }
  }}

  ${({ active }) => {
    if (active) {
      return css`
        :last-child {
          background-color: #e7e8e9;
        }

        :last-child > * {
          position: relative;
          border-radius: 7px 0 0 0;
          z-index: 1;

          &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 7px;
            height: calc(100% - 3.5px);
            border-radius: 7px 0 0 0;
            box-shadow: -1px 0 0 #c8cde0;
          }
        }
      `;
    } else {
      return css`
        :last-child {
          background-color: white;
        }

        :last-child > * {
          position: relative;
          border-radius: 0 0 0 7px;

          &::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 0 0 0 7px;
            box-shadow: inset 3px -3px 5px rgba(0, 0, 0, 0.05);
          }

          &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 1px;
            width: 100%;
            height: 5.5px;
            border-radius: 0 0 0 7px;
            box-shadow: 0 1px 0 #c8cde0;
          }
        }
      `;
    }
  }}
`;

const TabTextWrapper = styled.div<{ active?: boolean }>`
  padding: 20px;
  background-color: ${props => (props.active ? '#ffffff' : '#f1f2f3')};
  display: flex;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 35px 35px;
`;
