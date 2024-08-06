import { FC } from 'react';

import { Arrow, Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberJoinVerifyPageTemplateMobile } from './mobile';

export interface MemberJoinVerifyPageTemplateProps {
  name: string;
  setName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  authCode: string;
  setAuthCode: (value: string) => void;
  remaingValidAuthCodeTime: number;
  authCodeSent: boolean;
  verified: boolean;
  handleVerifyAuthCodeButtonClick: () => void;
  handleBackButtonClick: () => void;
  handleSendAuthCodeButtonClick: () => void;
  handleSubmitButtonClick: () => void;
}

export interface MemberJoinVerifyPageTemplateComponentProps
  extends MemberJoinVerifyPageTemplateProps {}

export const MemberJoinVerifyPageTemplate: FC<MemberJoinVerifyPageTemplateComponentProps> & {
  Mobile: FC<MemberJoinVerifyPageTemplateComponentProps>;
} = ({
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  authCode,
  setAuthCode,
  remaingValidAuthCodeTime,
  authCodeSent,
  verified,
  handleVerifyAuthCodeButtonClick,
  handleBackButtonClick,
  handleSendAuthCodeButtonClick,
  handleSubmitButtonClick,
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
                  <Text size={FONTSIZE_20}>휴대폰 인증</Text>
                </Flex.RSC>
                <Arrow
                  tail
                  direction="left"
                  size={4}
                  onClick={() => handleBackButtonClick()}
                  style={{ cursor: 'pointer' }}
                />
              </Flex.RBC>
              <Space.H6 />
              <Input
                showClearButton={true}
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2_5 />
                    <Icon src={'idcard-graypurple.svg'} size={22} />
                    <Space.V0_5 />
                  </Flex.RCC>
                }
                placeholder={'성함을 입력하세요.'}
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Space.H3 />
              <Flex layout="7 auto 3">
                <Input
                  disabled={verified}
                  shadow={true}
                  prefix={
                    <Flex.RCC>
                      <Space.V2_5 />
                      <Icon src={'phone-graypurple.svg'} size={22} />
                      <Space.V0_5 />
                    </Flex.RCC>
                  }
                  placeholder={'휴대폰 번호'}
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value.replace(/[^0-9]g/, ''))}
                />
                <Space.V2 />
                <Button
                  full
                  fill={true}
                  color="black"
                  shape={'round'}
                  style={{ height: 44 }}
                  disabled={
                    !name.length ||
                    phoneNumber.length !== 11 ||
                    verified ||
                    remaingValidAuthCodeTime > 0
                  }
                  text={
                    remaingValidAuthCodeTime > 0
                      ? `${Math.max(remaingValidAuthCodeTime, 0)}초 남음`
                      : '인증번호 요청'
                  }
                  onClick={() => handleSendAuthCodeButtonClick()}
                />
              </Flex>
              {authCodeSent || remaingValidAuthCodeTime > 0 ? (
                <>
                  <Space.H3 />
                  <Flex layout="7 auto 3">
                    <Input
                      disabled={verified}
                      shadow={true}
                      prefix={
                        <Flex.RCC>
                          <Space.V2_5 />
                          <Icon src={'phone-checked-graypurple.svg'} size={22} />
                          <Space.V0_5 />
                        </Flex.RCC>
                      }
                      placeholder={'인증번호'}
                      value={authCode}
                      onChange={e => setAuthCode(e.target.value)}
                    />
                    <Space.V2 />
                    <Button
                      full
                      fill={true}
                      color="black"
                      shape={'round'}
                      style={{ height: 44 }}
                      disabled={verified || authCode.length !== 4}
                      text={`인증하기`}
                      onClick={() => handleVerifyAuthCodeButtonClick()}
                    />
                  </Flex>
                </>
              ) : null}
              <Space.H6 />
              <Button
                disabled={
                  verified && name.length && phoneNumber.length === 11 && authCode.length === 4
                    ? false
                    : true
                }
                full
                text="확인"
                color="red"
                shape={'round'}
                style={{ height: 51 }}
                onClick={handleSubmitButtonClick}
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

MemberJoinVerifyPageTemplate.Mobile = MemberJoinVerifyPageTemplateMobile;
