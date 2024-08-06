import { FC } from 'react';

import {
  Arrow,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  Select,
  Space,
  Text,
} from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_BLACK,
  COLOR_RED,
  COLOR_WHITE,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_20,
} from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberJoinNewPageTemplateComponentProps } from './MemberJoinNewPageTemplate';

export const MemberJoinNewPageTemplateMobile: FC<MemberJoinNewPageTemplateComponentProps> = ({
  username,
  setUsername,
  usernameErrorMessage,
  handleCheckUsernameButtonClick,
  usernameStatus,
  password,
  setPassword,
  handlePasswordInputBlur,
  passwordErrorMessage,
  passwordConfirm,
  setPasswordConfirm,
  handlePasswordConfirmInputBlur,
  passwordConfirmErrorMessage,
  name,
  phoneNumber,
  email,
  setEmail,
  handleEmailInputBlur,
  emailErrorMessage,
  date,
  handleDateInputClick,
  gender,
  setGender,
  handleSubmitButtonClick,
  ...rest
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
                  <Text size={FONTSIZE_20}>신규 가입</Text>
                </Flex.RSC>
                <Arrow tail direction="left" size={4} />
              </Flex.RBC>
              <Space.H6 />

              <Flex layout="7 auto 3">
                <Input.Mobile
                  shadow={true}
                  prefix={
                    <Flex.RCC>
                      <Space.V2 />
                      <Icon src={'human-circle-graypurple.svg'} size={24} />
                    </Flex.RCC>
                  }
                  placeholder={'아이디'}
                  value={username}
                  onChange={e => setUsername(e.target.value.trim())}
                />
                <Space.V2 />
                <Button.Mobile
                  full
                  fill={true}
                  color={usernameStatus === 'AVAILABLE' ? `#09c782` : COLOR_BLACK}
                  shape={'round'}
                  style={{ height: 38 }}
                  text={
                    usernameStatus === 'AVAILABLE' ? (
                      <Flex.RSC>
                        <Icon src={'check-white.svg'} size={13} />
                        <Space.V2 />
                        <Text size={FONTSIZE_13} color={COLOR_WHITE}>
                          확인 완료
                        </Text>
                      </Flex.RSC>
                    ) : (
                      <Text size={FONTSIZE_13} color={COLOR_WHITE}>
                        중복 확인
                      </Text>
                    )
                  }
                  onClick={() => handleCheckUsernameButtonClick()}
                />
              </Flex>
              {usernameErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={COLOR_RED}>
                    ⚠ {usernameErrorMessage}
                  </Text>
                </>
              ) : null}
              <Space.H3 />
              <Input.Mobile
                type="password"
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'lock-graypurple.svg'} size={24} />
                  </Flex.RCC>
                }
                placeholder={'비밀번호'}
                value={password}
                onBlur={handlePasswordInputBlur}
                onChange={e => setPassword(e.target.value)}
              />
              {!passwordErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={'#8e93ad'}>
                    ⚠ 영문+특수문자 포함 8자이상
                  </Text>
                </>
              ) : null}
              {passwordErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={COLOR_RED}>
                    ⚠ {passwordErrorMessage}
                  </Text>
                </>
              ) : null}
              <Space.H3 />
              <Input.Mobile
                type="password"
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'lock-checked-graypurple.svg'} size={24} />
                  </Flex.RCC>
                }
                placeholder={'비밀번호 재입력'}
                value={passwordConfirm}
                onBlur={handlePasswordConfirmInputBlur}
                onChange={e => setPasswordConfirm(e.target.value)}
              />
              {passwordConfirmErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={COLOR_RED}>
                    ⚠ {passwordConfirmErrorMessage}
                  </Text>
                </>
              ) : null}
              <Space.H6 />
              <Input.Mobile
                disabled={true}
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'idcard-graypurple.svg'} size={24} />
                  </Flex.RCC>
                }
                placeholder={'이름'}
                value={name}
                onChange={e => {}}
              />
              <Space.H3 />
              <Input.Mobile
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'letter-graypurple-line.svg'} size={24} />
                  </Flex.RCC>
                }
                placeholder={'이메일 주소 입력'}
                value={email}
                onBlur={handleEmailInputBlur}
                onChange={e => setEmail(e.target.value.trim())}
              />
              {emailErrorMessage.length ? (
                <>
                  <Space.H1 />
                  <Text size={FONTSIZE_12} color={COLOR_RED}>
                    ⚠ {emailErrorMessage}
                  </Text>
                </>
              ) : null}
              <Space.H3 />
              <Input.Mobile
                disabled={true}
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'phone-graypurple.svg'} size={24} />
                  </Flex.RCC>
                }
                placeholder={'핸드폰 번호'}
                value={phoneNumber}
              />
              <Space.H3 />
              <Input.Mobile
                readonly={true}
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'cake-graypurple-line.svg'} size={24} />
                  </Flex.RCC>
                }
                placeholder={'생일 선택 (선택)'}
                value={date ?? ''}
                onChange={() => {}}
                onClick={handleDateInputClick}
              />
              <Space.H1 />
              <Text size={FONTSIZE_12} color={'#8e93ad'}>
                ⚠ 생일 축하 쿠폰 등 이벤트 혜택을 받을 수 있습니다.
              </Text>
              <Space.H3 />

              <Select.Mobile
                shadow={true}
                prefix={
                  <Flex.RCC>
                    <Space.V2 />
                    <Icon src={'man-and-woman-graypurle-line.svg'} size={24} />
                  </Flex.RCC>
                }
                options={[
                  { value: '', label: '(선택해 주세요)' },
                  { value: 'F', label: '여성' },
                  { value: 'M', label: '남성' },
                ]}
                placeholder={'성별 (선택)'}
                value={gender}
                onChange={value => setGender(value)}
              />
              <Space.H4 />
              <Button.Mobile
                disabled={
                  !(
                    username.length &&
                    usernameStatus === 'AVAILABLE' &&
                    !usernameErrorMessage.length &&
                    password.length &&
                    passwordConfirm.length &&
                    password === passwordConfirm &&
                    !passwordErrorMessage.length &&
                    !passwordConfirmErrorMessage.length &&
                    email.length &&
                    !emailErrorMessage.length
                  )
                }
                full
                text="가입 완료"
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
