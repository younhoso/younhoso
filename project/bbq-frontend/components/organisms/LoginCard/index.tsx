import { FC, ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Flex, Icon, Image, Space, Text } from '@/components/atoms';
import {
  COLOR_DIVIDER,
  COLOR_PRIMARY,
  COLOR_WHITE,
  FONTSIZE_10,
  FONTSIZE_11,
  FONTSIZE_12,
  PLANCK,
} from '@/constants';

export interface LoginCardProps {}

export interface LoginCardComponentProps extends LoginCardProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const LoginCard: FC<LoginCardComponentProps> = props => {
  const { className, children, ...rest } = props;

  const router = useRouter();

  return (
    <Wrapper>
      <Flex.CCC full={true}>
        <Space.H1 />
        <Text color={'#324266'} size={FONTSIZE_12}>
          bbq 회원시면 더 많은 혜택을 받으실 수 있어요!
        </Text>
        <Space.H2_5 />
        <LoginButton onClick={() => router.push('/member/login')}>
          <Image src={'symbols/logo-white.svg'} width={50} />
          <Space.V2 />
          <Text color={COLOR_WHITE}>로그인</Text>
        </LoginButton>
        <Space.H2 />
        <Flex.RSC>
          <div onClick={() => router.push('/member/find')} style={{ cursor: 'pointer' }}>
            <Flex.RSC>
              <Text color={'#324266'} size={FONTSIZE_12}>
                아이디
              </Text>
              <Space.V1 />
              <Text color={'#324266'} size={FONTSIZE_12}>
                ㆍ
              </Text>
              <Space.V1 />
              <Text color={'#324266'} size={FONTSIZE_12}>
                비밀번호 찾기
              </Text>
            </Flex.RSC>
          </div>
          <Space.V1_5 />
          <Text color={'#324266'} size={FONTSIZE_10}>
            |
          </Text>
          <Space.V1_5 />
          <div onClick={() => router.push('/member/join')} style={{ cursor: 'pointer' }}>
            <Text color={'#324266'} size={FONTSIZE_12} weight={700}>
              회원가입
            </Text>
          </div>
        </Flex.RSC>
      </Flex.CCC>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${PLANCK * 3}px;
  box-sizing: border-box;
  background-color: rgb(239, 240, 244);
`;

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR_PRIMARY};
  height: 45px;
  width: 100%;
  border-radius: 7px;
  cursor: pointer;
`;
