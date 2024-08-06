// deprecated
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { AccountAPI } from '@/apis';
import { Box, Flex, Icon, Input, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { PLANCK } from '@/constants';
import { parseApiError } from '@/utils';

const VerifyPhonePopup = ({
  type = 'member',
  name: defaultName,
  title,
  handleSuccess,
}: {
  type?: 'member' | 'guest';
  name?: string;
  title?: string | ReactNode | ReactNode[];
  handleSuccess: (params: { phoneNumber: string; authCode: string }) => void;
}) => {
  const { closeModal } = useModal();

  const [name, setName] = useState<string>(defaultName ?? '');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [authCodeSent, setAuthCodeSent] = useState<boolean>(false);
  const [remaingValidAuthCodeTime, setRemaingValidAuthCodeTime] = useState<number>(0);

  // 인증코드 발송 버튼 클릭 이벤트
  const handleSendAuthCodeButtonClick = useCallback(async () => {
    try {
      await AccountAPI.Verification.send({
        name: name,
        phoneNumber: phoneNumber,
      });

      setRemaingValidAuthCodeTime(60);
      setAuthCodeSent(true);
    } catch (error) {
      alert(parseApiError(error).message);
    }
  }, [name, phoneNumber, remaingValidAuthCodeTime]);

  // 인증코드 확인(인증) 버튼 클릭 이벤트
  const handleConfirmAuthCodeButtonClick = useCallback(async () => {
    try {
      if (type === 'member') {
        await AccountAPI.Verification.confirm({
          name: name,
          phoneNumber: phoneNumber,
          authCode: authCode,
        });
      } else {
        await AccountAPI.Verification.confirm({
          name: '비회원',
          phoneNumber: phoneNumber,
          authCode: authCode,
        });

        await AccountAPI.Verification.confirmGuest({
          phoneNumber: phoneNumber,
          authCode: authCode,
        });
      }

      handleSuccess({
        phoneNumber: phoneNumber,
        authCode: authCode,
      });
      closeModal();
    } catch (error) {
      console.error(error);
      alert(parseApiError(error).message);
    }
  }, [type, name, phoneNumber, authCode, remaingValidAuthCodeTime]);

  // authCode 유효 시간 감소
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRemaingValidAuthCodeTime(remaingValidAuthCodeTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [remaingValidAuthCodeTime]);

  return (
    <Box full padding={PLANCK * 2}>
      <Space.H2 />
      {title ? (
        <>
          <Text lineHeight={'1.4em'} align="center">
            {title}
          </Text>
          <Space.H6 />
        </>
      ) : null}
      <Flex layout="7 auto 3">
        <Input
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
          onChange={e => setPhoneNumber(e.target.value.replace(/[0-9]g/, ''))}
        />
        <Space.V2 />
        <Button
          full
          fill={true}
          color="black"
          shape={'round'}
          style={{ height: 44 }}
          disabled={
            phoneNumber.trim().length !== 11 ||
            /*(previousPhoneNumber &&
              previousPhoneNumber === phoneNumber.trim()) ||*/
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
          <Input
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
            onChange={e => setAuthCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
          />
        </>
      ) : null}
      <Space.H6 />
      <Button
        disabled={name.length && phoneNumber.length === 11 && authCode.length === 4 ? false : true}
        full
        text="확인"
        color="red"
        shape={'round'}
        style={{ height: 51 }}
        onClick={handleConfirmAuthCodeButtonClick}
      />
      <Space.H3 />
    </Box>
  );
};

export { VerifyPhonePopup };
