import { FC } from 'react';

import { Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, COLOR_RED, FONTSIZE_14, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberChangePasswordWithCIPageTemplateMobile } from './mobile';

export interface MemberChangePasswordWithCIPageTemplateProps {
  token: string;
  isAlreadyIntegratedMember: boolean;
  integration: boolean;
  name: string;
  setName: (name: string) => void;
  username: string;
  setUsername: (username: string) => void;
  defaultUserName: string;
  password: string;
  setPassword: (password: string) => void;
  handlePasswordInputBlur: () => void;
  passwordErrorMessage: string;
  passwordConfirm: string;
  handlePasswordConfirmInputBlur: () => void;
  passwordConfirmErrorMessage: string;
  setPasswordConfirm: (passwordConfirm: string) => void;
  handleConfirmButtonClick: () => void;
}

export interface MemberChangePasswordWithCIPageTemplateComponentProps
  extends MemberChangePasswordWithCIPageTemplateProps {}

export const MemberChangePasswordWithCIPageTemplate: FC<MemberChangePasswordWithCIPageTemplateComponentProps> & {
  Mobile: FC<MemberChangePasswordWithCIPageTemplateComponentProps>;
} = ({
  token,
  integration,
  name,
  setName,
  username,
  setUsername,
  defaultUserName,
  password,
  setPassword,
  handlePasswordInputBlur,
  passwordErrorMessage,
  passwordConfirm,
  setPasswordConfirm,
  handlePasswordConfirmInputBlur,
  passwordConfirmErrorMessage,
  handleConfirmButtonClick,
}) => {
  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Flex.CSC>
            <TabBox>
              <Flex.RBC>
                <Flex.RSC>
                  <Image src={'symbols/logo-red-background.svg'} width={42} />
                  <Space.V2 />
                  <Text size={FONTSIZE_20}>아이디·비밀번호 찾기</Text>
                </Flex.RSC>
              </Flex.RBC>
              <Space.H6 />
              {defaultUserName ? (
                <>
                  <Flex.RCC>
                    <Text color={COLOR_BLACK} align="center" lineHeight={'1.25em'}>
                      {!integration ? (
                        <>
                          입력하신 정보와
                          <br />
                          일치하는 아이디입니다.
                        </>
                      ) : (
                        <>
                          안전한 서비스 이용을 위해
                          <br />
                          새로운 비밀번호를 입력해 주세요.
                        </>
                      )}
                    </Text>
                  </Flex.RCC>
                  <Space.H5 />
                </>
              ) : (
                <Space.H1 />
              )}
              <Input
                disabled={!!token}
                showClearButton={true}
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2_5 />
                    <Icon src={'human-circle-graypurple.svg'} size={22} />
                    <Space.V0_5 />
                  </Flex.RCC>
                }
                placeholder={'계정'}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              {false && (
                <>
                  <Space.H3 />
                  <Input
                    disabled={!!token}
                    showClearButton={true}
                    shadow={true}
                    prefix={
                      <Flex.RCC>
                        <Space.V2_5 />
                        <Icon src={'idcard-graypurple.svg'} size={22} />
                        <Space.V0_5 />
                      </Flex.RCC>
                    }
                    placeholder={'이름'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </>
              )}
              <Space.H3 />
              <Input
                type="password"
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2_5 />
                    <Icon src={'lock-graypurple.svg'} size={23} />
                    <Space.V0_5 />
                  </Flex.RCC>
                }
                placeholder={'비밀번호'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={handlePasswordInputBlur}
              />
              {!passwordErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_14} color={'#8e93ad'}>
                    ⚠ 영문+특수문자 포함 8자이상
                  </Text>
                </>
              ) : null}
              {passwordErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_14} color={COLOR_RED}>
                    ⚠ {passwordErrorMessage}
                  </Text>
                </>
              ) : null}
              <Space.H3 />
              <Input
                type="password"
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2_5 />
                    <Icon src={'lock-checked-graypurple.svg'} size={23} />
                    <Space.V0_5 />
                  </Flex.RCC>
                }
                placeholder={'비밀번호 재입력'}
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                onBlur={handlePasswordConfirmInputBlur}
              />
              {passwordConfirmErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_14} color={COLOR_RED}>
                    ⚠ {passwordConfirmErrorMessage}
                  </Text>
                </>
              ) : null}
              <Space.H8 />
              <Button
                disabled={
                  !password.length ||
                  !passwordConfirm.length ||
                  password !== passwordConfirm ||
                  passwordErrorMessage.length > 0 ||
                  passwordConfirmErrorMessage.length > 0
                }
                full
                text="확인"
                color="red"
                shape={'round'}
                style={{ height: 51 }}
                onClick={() => handleConfirmButtonClick()}
              />
            </TabBox>
            <Space.H7 />
            <Footer />
            <Space.H7 />
          </Flex.CSC>
        </Container.Body>
      </Container>
    </Wrapper>
  );
};

MemberChangePasswordWithCIPageTemplate.Mobile = MemberChangePasswordWithCIPageTemplateMobile;
