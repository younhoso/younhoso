import React, { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';

import classNames from 'classnames';
import styled, { css } from 'styled-components';

import { ContentBoxMobile } from './mobile';

export interface ContentBoxProps {
  tabs?: {
    name: string;
    url: string;
    selected: boolean;
  }[];
}

export interface ContentBoxComponentProps extends ContentBoxProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const ContentBox: FC<ContentBoxComponentProps> & {
  Mobile: FC<ContentBoxComponentProps>;
} = props => {
  const { tabs, className, children, ...rest } = props;

  const router = useRouter();

  return (
    <Wrapper className={classNames(className)} {...rest}>
      <InnerBox>{children}</InnerBox>
    </Wrapper>
  );
};
ContentBox.Mobile = ContentBoxMobile;

const Wrapper = styled.div`
  border-radius: 7px;
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #c8cde0;
  overflow: hidden;
  background-color: #ffffff;
  min-width: 420px;
`;

const InnerBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
