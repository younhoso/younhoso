import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { addSuffixIfNotString } from '@/utils';

export interface SectionProps {
  padding?: number | string;
}

export interface SectionComponentProps extends SectionProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const Section: FC<SectionComponentProps> & {
  Head: FC<{
    padding?: number | string;
    className?: string;
    children?: string | ReactNode | ReactNode[];
    [x: string]: any;
  }>;
  Body: FC<{
    padding?: number | string;
    className?: string;
    children?: string | ReactNode | ReactNode[];
    [x: string]: any;
  }>;
  Foot: FC<{
    padding?: number | string;
    className?: string;
    children?: string | ReactNode | ReactNode[];
    [x: string]: any;
  }>;
} = props => {
  const { padding, className, children, ...rest } = props;

  return (
    <Wrapper padding={padding ?? 0} className={classNames(className)} {...rest}>
      {children}
    </Wrapper>
  );
};

Section.Head = ({ padding, className, children, ...rest }) => {
  return (
    <HeadWrapper padding={padding ?? 0} className={classNames(className)} {...rest}></HeadWrapper>
  );
};

Section.Body = ({ padding, className, children, ...rest }) => {
  return (
    <BodyWrapper padding={padding ?? 0} className={classNames(className)} {...rest}></BodyWrapper>
  );
};

Section.Foot = ({ padding, className, children, ...rest }) => {
  return (
    <FootWrapper padding={padding ?? 0} className={classNames(className)} {...rest}></FootWrapper>
  );
};

Section.Head.displayName = 'Section.Head';
Section.Body.displayName = 'Section.Body';
Section.Foot.displayName = 'Section.Foot';

const Wrapper = styled.div<{ padding: number | string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${({ padding }) => {
    return `padding: ${addSuffixIfNotString(padding, 'px')};`;
  }}
`;

const HeadWrapper = styled.div<{ padding: number | string }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;

  ${({ padding }) => {
    return `padding: ${addSuffixIfNotString(padding, 'px')};`;
  }}
`;

const BodyWrapper = styled.div<{ padding: number | string }>`
  position: relative;
  width: 100%;
  flex: 1;
  box-sizing: border-box;

  ${({ padding }) => {
    return `padding: ${addSuffixIfNotString(padding, 'px')};`;
  }}
`;

const FootWrapper = styled.div<{ padding: number | string }>`
  position: relative;
  width: 100%;
  box-sizing: border-box;

  ${({ padding }) => {
    return `padding: ${addSuffixIfNotString(padding, 'px')};`;
  }}
`;
