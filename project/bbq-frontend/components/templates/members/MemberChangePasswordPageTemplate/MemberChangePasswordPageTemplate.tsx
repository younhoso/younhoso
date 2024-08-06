import { FC } from 'react';

import { Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, COLOR_RED, FONTSIZE_14, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberChangePasswordPageTemplateMobile } from './mobile';

export interface MemberChangePasswordPageTemplateProps {
  token?: string;
  isAlreadyIntegratedMember: boolean;
  integration: boolean;
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  authCode: string;
  setAuthCode: (authCode: string) => void;
  remaingValidAuthCodeTime: number;
  handleSendAuthCodeButtonClick: () => void;
  handleConfirmAuthCodeButtonClick: () => void;
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

export interface MemberChangePasswordPageTemplateComponentProps
  extends MemberChangePasswordPageTemplateProps {}

export const MemberChangePasswordPageTemplate: FC<MemberChangePasswordPageTemplateComponentProps> & {
  Mobile: FC<MemberChangePasswordPageTemplateComponentProps>;
} = ({
  token,
  integration,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  authCode,
  setAuthCode,
  remaingValidAuthCodeTime,
  handleSendAuthCodeButtonClick,
  handleConfirmAuthCodeButtonClick,
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
              {!token ? (
                <>
                  <Space.H3 />
                  <Flex layout="7 auto 3">
                    <Input
                      showClearButton={true}
                      shadow={true}
                      prefix={
                        <Flex.RCC>
                          <Space.V2_5 />
                          <Icon src={'phone-graypurple.svg'} size={22} />
                          <Space.V0_5 />
                        </Flex.RCC>
                      }
                      placeholder={'휴대폰 번호 입력'}
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    <Space.V2 />
                    <Button
                      disabled={
                        remaingValidAuthCodeTime > 0 ||
                        phoneNumber.length !== 11 ||
                        !name.length ||
                        !username.length
                      }
                      full
                      fill={true}
                      text={
                        remaingValidAuthCodeTime > 0
                          ? `${Math.max(remaingValidAuthCodeTime, 0)}초 남음`
                          : '인증번호 보내기'
                      }
                      color="black"
                      shape={'round'}
                      style={{ height: 44 }}
                      onClick={() => handleSendAuthCodeButtonClick()}
                    />
                  </Flex>
                  <Space.H3 />
                  <Flex layout="7 auto 3">
                    <Input
                      showClearButton={true}
                      shadow={true}
                      prefix={
                        <Flex.RCC>
                          <Space.V2_5 />
                          <Icon src={'phone-checked-graypurple.svg'} size={22} />
                          <Space.V0_5 />
                        </Flex.RCC>
                      }
                      placeholder={'인증번호 입력 (4자리 숫자)'}
                      value={authCode}
                      onChange={e => setAuthCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    />
                    {remaingValidAuthCodeTime > 0 ? (
                      <>
                        <Space.V2 />
                        <Button
                          disabled={remaingValidAuthCodeTime <= 0 || authCode.length !== 4}
                          full
                          fill={true}
                          text={'인증 완료'}
                          color="black"
                          shape={'round'}
                          style={{ height: 44 }}
                          onClick={() => handleConfirmAuthCodeButtonClick()}
                        />
                      </>
                    ) : null}
                  </Flex>
                </>
              ) : null}
              {token ? (
                <>
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

MemberChangePasswordPageTemplate.Mobile = MemberChangePasswordPageTemplateMobile;
