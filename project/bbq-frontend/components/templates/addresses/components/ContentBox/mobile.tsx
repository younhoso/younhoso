import { FC } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';

import { ContentBoxComponentProps } from '.';

export const ContentBoxMobile: FC<ContentBoxComponentProps> = props => {
  const { tabs, className, children, ...rest } = props;

  return (
    <Wrapper className={classNames(className)} {...rest}>
      <InnerBox>{children}</InnerBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 7px;
  box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px #c8cde0;
  overflow: hidden;
  background-color: #ffffff;
  width: 100%;
  max-width: calc(100vw - ${PLANCK * 6}px);
`;

const InnerBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
