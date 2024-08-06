import { FC } from 'react';

import { useRouter } from 'next/router';

import { Arrow, Container, Flex, Icon, Image, Input, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, COLOR_GRAY, FONTSIZE_14, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberFindUsernamePageTemplateComponentProps } from './MemberFindUsernamePageTemplate';

export const MemberFindUsernamePageTemplateMobile: FC<MemberFindUsernamePageTemplateComponentProps> & {} =
  ({
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    authCode,
    setAuthCode,
    remaingValidAuthCodeTime,
    handleSendAuthCodeButtonClick,
    handleSubmit,
    handleBackButtonClick,
  }) => {
    const router = useRouter();

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
                    <Text size={FONTSIZE_20}>아이디·비밀번호 찾기</Text>
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
                <Flex.RCC>
                  <Text color={COLOR_BLACK} align="center" lineHeight={'1.25em'}>
                    아이디를 찾기 위해
                    <br />
                    아래 정보를 입력해주세요
                  </Text>
                </Flex.RCC>
                <Space.H5 />
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
                  placeholder={'이름'}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Space.H3 />
                <Flex layout="7 auto 3">
                  <Input.Mobile
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
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                  <Space.V2 />
                  <Button.Mobile
                    disabled={remaingValidAuthCodeTime > 0 || phoneNumber.length !== 11}
                    full
                    fill={true}
                    text={
                      remaingValidAuthCodeTime > 0
                        ? `${Math.max(remaingValidAuthCodeTime, 0)}초 남음`
                        : '인증번호 보내기'
                    }
                    color="black"
                    shape={'round'}
                    style={{ height: 38 }}
                    onClick={() => handleSendAuthCodeButtonClick()}
                  />
                </Flex>
                <Space.H3 />
                <Input.Mobile
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
                <Space.H4 />
                <Button.Mobile
                  disabled={!name.length || phoneNumber.length !== 11 || authCode.length !== 4}
                  full
                  text="확인"
                  color="red"
                  shape={'round'}
                  style={{ height: 51 }}
                  onClick={() => handleSubmit()}
                />
                <Space.H4 />
                <Flex.RSC>
                  <Text color={COLOR_GRAY} size={FONTSIZE_14}>
                    비밀번호를 잊으셨나요?
                  </Text>
                  <Space.V1_5 />
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push('/member/find/change-password')}
                  >
                    <Text size={FONTSIZE_14} decoration={'underline'}>
                      비밀번호 찾기
                    </Text>
                  </div>
                </Flex.RSC>
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
