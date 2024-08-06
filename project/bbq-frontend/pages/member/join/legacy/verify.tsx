import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { WrongAuthCodePopup } from '@/components/organisms';
import { AlreadyRegisteredPopup } from '@/components/organisms/popups/AlreadyRegisteredPopup';
import { MemberJoinVerifyPageTemplate } from '@/components/templates';
import { parseApiError, stashData } from '@/utils';

export default function MemberVerify() {
  const router = useRouter();
  const { openModal } = useModal();
  const { registrationKey } = router.query;

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [authCodeSent, setAuthCodeSent] = useState<boolean>(false);
  const [remaingValidAuthCodeTime, setRemaingValidAuthCodeTime] = useState<number>(0);
  const [verified, setVerified] = useState<boolean>(false);

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
  const handleSubmitButtonClick = useCallback(async () => {
    try {
      const { isRegistered, username, phoneVerificationKey } =
        await AccountAPI.Member.initRegistration({
          name: name,
          phoneNumber: phoneNumber,
          authCode: authCode,
          ...(registrationKey && {
            registrationKey: registrationKey as string,
          }),
        });

      // 이미 가입된 상태
      if (isRegistered) {
        // 소셜 연동
        if (registrationKey) {
          try {
            await AccountAPI.Member.connectOAuth({
              registrationKey: registrationKey as string,
              username: username!,
              phoneVerificationKey: phoneVerificationKey,
            });

            alert('소셜 계정과 연동이 완료되었습니다.\n다시 로그인해주세요.');
            router.push('/member/login');
          } catch (err) {
            console.error(err);
            alert(parseApiError(err).message);
          }
        }
        // 소셜 연동 아님
        else {
          openModal({
            title: '계정 알림',
            body: <AlreadyRegisteredPopup username={username!} />,
          });
        }
      }
      // 가입 안된 상태
      else {
        stashData('phone-verification', {
          name: name,
          username: username,
          phoneNumber: phoneNumber,
          phoneVerificationKey: phoneVerificationKey,
        });
        router.push(`/member/join${registrationKey ? `?registrationKey=${registrationKey}` : ''}`);
      }
    } catch (error) {
      console.error(error);
      const data = parseApiError(error);

      if (data.code === 'PHONE_VERIFICATION_ERROR') {
        openModal({
          title: '인증 알림',
          body: <WrongAuthCodePopup />,
        });
      } else {
        alert(data.message);
      }
    }
  }, [name, phoneNumber, remaingValidAuthCodeTime, registrationKey]);

  // 인증 확인 버튼 클릭 이벤트
  const handleVerifyAuthCodeButtonClick = useCallback(async () => {
    try {
      const { message } = await AccountAPI.Verification.confirm({
        name: name,
        phoneNumber: phoneNumber,
        authCode: authCode,
      });
      setVerified(true);
    } catch (error) {
      console.error(error);
      alert(parseApiError(error));
    }
  }, [name, phoneNumber, authCode]);

  // authCode 유효 시간 감소
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRemaingValidAuthCodeTime(remaingValidAuthCodeTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [remaingValidAuthCodeTime]);

  const props = {
    name: name,
    setName: setName,
    phoneNumber: phoneNumber,
    setPhoneNumber: setPhoneNumber,
    authCode: authCode,
    setAuthCode: setAuthCode,
    remaingValidAuthCodeTime: remaingValidAuthCodeTime,
    authCodeSent: authCodeSent,
    verified: verified,
    handleVerifyAuthCodeButtonClick: handleVerifyAuthCodeButtonClick,
    handleBackButtonClick: () => {
      router.back();
    },
    handleSendAuthCodeButtonClick: handleSendAuthCodeButtonClick,
    handleSubmitButtonClick: handleSubmitButtonClick,
  };

  return (
    <>
      <Desktop>
        <MemberJoinVerifyPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberJoinVerifyPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
