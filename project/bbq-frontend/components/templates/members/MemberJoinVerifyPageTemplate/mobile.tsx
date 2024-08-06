import { FC } from 'react';

import { Arrow, Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberJoinVerifyPageTemplateComponentProps } from './MemberJoinVerifyPageTemplate';

export const MemberJoinVerifyPageTemplateMobile: FC<MemberJoinVerifyPageTemplateComponentProps> & {} =
  ({
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
      <Wrapper.Mobile>
        <Container.Mobile>
          <Container.Mobile.Body>
            <Flex.CSC>
              <TabBox.Mobile>
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
                <Input.Mobile
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
                  <Input.Mobile
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
                  <Button.Mobile
                    full
                    fill={true}
                    color="black"
                    shape={'round'}
                    style={{ height: 38 }}
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
                      <Input.Mobile
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
                      <Button.Mobile
                        full
                        fill={true}
                        color="black"
                        shape={'round'}
                        style={{ height: 38 }}
                        disabled={verified || authCode.length !== 4}
                        text={`인증하기`}
                        onClick={() => handleVerifyAuthCodeButtonClick()}
                      />
                    </Flex>
                  </>
                ) : null}
                <Space.H4 />
                <Button.Mobile
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
              </TabBox.Mobile>
              <Space.H7 />
              <Footer.Mobile />
              <Space.H7 />
            </Flex.CSC>
          </Container.Mobile.Body>
        </Container.Mobile>
      </Wrapper.Mobile>
    );
  };
