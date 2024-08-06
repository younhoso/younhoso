import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { WrongAuthCodePopup, useCIModal } from '@/components/organisms';
import { MemberIntegrateVerifyPageTemplate } from '@/components/templates';
import { parseApiError, popData, stashData } from '@/utils';

export default function MemberIntegrateVerifyPage() {
  const router = useRouter();
  const { openModal } = useModal();

  const [username, setUsername] = useState<string | undefined>(undefined); // TODO
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
  const handleConfirmAuthCodeButtonClick = useCallback(async () => {
    if (!username) return;

    try {
      const { token, isAlreadyIntegratedMember } =
        await AccountAPI.Member.initFindAndChangePassword({
          username: username,
          name: name,
          phoneNumber: phoneNumber,
          authCode: authCode,
        });

      stashData('change-password', {
        username: username,
        name: name,
        token: token,
        isAlreadyIntegratedMember: isAlreadyIntegratedMember,
        integration: true,
      });
      router.push(`/member/find/change-password`);
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
  }, [username, name, phoneNumber, remaingValidAuthCodeTime]);

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

  // pop Data
  useEffect(() => {
    try {
      const data = popData<{
        id: string;
      }>('member/integrate', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });
      if (data && data.id) {
        setUsername(data.id);
      } else {
        router.push('/member/login');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!username) {
    return null;
  }

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
    handleBackButtonClick: () => {},
    handleSendAuthCodeButtonClick: handleSendAuthCodeButtonClick,
    handleConfirmAuthCodeButtonClick: handleConfirmAuthCodeButtonClick,
  };

  return (
    <>
      <Desktop>
        <MemberIntegrateVerifyPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberIntegrateVerifyPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
