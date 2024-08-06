import React, { FC, ReactNode } from 'react';

import Link from 'next/link';

import { Divider, Flex, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_11 } from '@/constants';

import { FooterMobile } from './mobile';

export interface FooterProps {}

export interface FooterComponentProps extends FooterProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const Footer: FC<FooterComponentProps> & {
  Mobile: FC<FooterComponentProps>;
} = props => {
  const { className, children, ...rest } = props;

  return (
    <>
      <Flex.RCC>
        <Link href="https://static.bbqorder.co.kr/html/terms_of_use.html">
          <Text color={'#324266'} size={FONTSIZE_11}>
            이용약관
          </Text>
        </Link>
        <Space.V4 />
        <div style={{ height: 11 }}>
          <Divider.V1 color={'#324266'} opacity={0.5} />
        </div>
        <Space.V4 />
        <Link href="https://static.bbqorder.co.kr/html/privacy_policy.html">
          <Text color={'#324266'} size={FONTSIZE_11} weight={800}>
            개인정보처리방침
          </Text>
        </Link>
        <Space.V4 />
        <div style={{ height: 11 }}>
          <Divider.V1 color={'#324266'} opacity={0.5} />
        </div>
        <Space.V4 />
        <Link href="https://static.bbqorder.co.kr/html/location.html">
          <Text color={'#324266'} size={FONTSIZE_11}>
            위치기반서비스
          </Text>
        </Link>
        <Space.V4 />
        <div style={{ height: 11 }}>
          <Divider.V1 color={'#324266'} opacity={0.5} />
        </div>
        <Space.V4 />
        <Link href="/faq">
          <Text color={'#324266'} size={FONTSIZE_11}>
            고객센터
          </Text>
        </Link>
      </Flex.RCC>
      <Space.H4 />
      <Flex.RCC>
        <Image src={'symbols/logo-red-background.svg'} width={36} />
        <Space.V3 />
        <Text color={'#324266'} size={FONTSIZE_11}>
          © 2019 GENESIS BBQ. All rights reserved.
        </Text>
      </Flex.RCC>
    </>
  );
};
Footer.Mobile = FooterMobile;
