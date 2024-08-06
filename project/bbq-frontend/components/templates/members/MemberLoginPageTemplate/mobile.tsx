import { signIn } from 'next-auth/react';
import { FC } from 'react';

import Link from 'next/link';

import {
  Arrow,
  CheckBox,
  Container,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Space,
  Text,
} from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_GRAY, FONTSIZE_12, FONTSIZE_13, FONTSIZE_14, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberLoginPageTemplateComponentProps } from './MemberLoginPageTemplate';

export const MemberLoginPageTemplateMobile: FC<MemberLoginPageTemplateComponentProps> = ({
  id,
  setId,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  login,
  snsLogin,
  ...rest
}) => {
  return (
    <Wrapper.Mobile>
      <Container.Mobile>
        <Flex.CSC>
          <TabBox.Mobile>
            <Flex.RBC>
              <Flex.RSC>
                <Image src={'symbols/logo-red-background.svg'} width={42} />
                <Space.V2 />
                <Text size={FONTSIZE_20}>로그인</Text>
              </Flex.RSC>
              {/* <Arrow tail direction="left" size={4} /> */}
            </Flex.RBC>
            <Space.H6 />
            <Input.Mobile
              showClearButton={true}
              shadow={true}
              prefix={
                <Flex.RCC>
                  <Space.V2 />
                  <Icon src={'human-circle-graypurple.svg'} size={22} />
                </Flex.RCC>
              }
              placeholder={'아이디를 입력하세요.'}
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <Space.H3 />
            <Input.Mobile
              showClearButton={true}
              type="password"
              shadow={true}
              prefix={
                <Flex.RCC>
                  <Space.V2 />
                  <Icon src={'lock-graypurple.svg'} size={22} />
                </Flex.RCC>
              }
              placeholder={'비밀번호를 입력하세요.'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  login();
                }
              }}
            />
            <Space.H3 />
            <CheckBox.Mobile
              theme={'dark'}
              label={
                <>
                  <Space.V1_5 />
                  <Text size={FONTSIZE_14} color={COLOR_GRAY}>
                    로그인 상태유지
                  </Text>
                </>
              }
              checked={rememberMe}
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Space.H4 />
            <Button.Mobile
              full
              text="로그인"
              color="red"
              shape={'round'}
              size={'big'}
              onClick={() => login()}
            />
            <Space.H4 />
            <Flex.RCC>
              <Link href="/member/find/change-password">
                <Text color={COLOR_GRAY} size={FONTSIZE_13}>
                  비밀번호 찾기
                </Text>
              </Link>
              <Space.V2_5 />
              <div style={{ height: 14 }}>
                <Divider.V1 />
              </div>
              <Space.V2_5 />
              <Link href="/member/find">
                <Text color={COLOR_GRAY} size={FONTSIZE_13}>
                  아이디 찾기
                </Text>
              </Link>
              <Space.V2_5 />
              <div style={{ height: 14 }}>
                <Divider.V1 />
              </div>
              <Space.V2_5 />
              <Link href="/member/join">
                <Text color={COLOR_GRAY} size={FONTSIZE_13}>
                  회원가입
                </Text>
              </Link>
            </Flex.RCC>
            <Space.H7 />
            <Flex.RSC layout="1 auto auto auto 1">
              <Divider.H1 />
              <Space.V2 />
              <Text color={COLOR_GRAY} size={FONTSIZE_12}>
                SNS 회원가입
              </Text>
              <Space.V2 />
              <Divider.H1 />
            </Flex.RSC>
            <Space.H5 />
            <Flex.RCC>
              <Icon onClick={() => snsLogin('naver')} src={'sns-naver.svg'} size={40} />
              <Space.V4 />
              <Icon onClick={() => snsLogin('kakao')} src={'sns-kakao.svg'} size={40} />
              <Space.V4 />
              <Icon onClick={() => snsLogin('google')} src={'sns-google.svg'} size={40} />
              {/*
              <Space.V4 />
              <Icon src={"sns-apple.svg"} size={40} />
               */}
            </Flex.RCC>
          </TabBox.Mobile>
          <Space.H7 />
          <Footer.Mobile />
          <Space.H7 />
        </Flex.CSC>
      </Container.Mobile>
    </Wrapper.Mobile>
  );
};
