import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis/account';
import { Desktop, Mobile } from '@/components/functions';
import { MemberFindUsernamePageTemplate } from '@/components/templates';
import { parseApiError, stashData } from '@/utils';

export default function MemberFindUsernamePage() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [remaingValidAuthCodeTime, setRemaingValidAuthCodeTime] = useState<number>(0);

  const handleSendAuthCodeButtonClick = useCallback(async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      alert(`휴대폰 번호를 올바르게 입력해주세요.`);
      return;
    }

    if (remaingValidAuthCodeTime > 0) {
      alert(`${remaingValidAuthCodeTime}초 후에 다시 시도해주세요.`);
      return;
    }

    try {
      await AccountAPI.Verification.send({
        name: name,
        phoneNumber: phoneNumber,
      });

      setRemaingValidAuthCodeTime(60);
    } catch (error) {
      alert(parseApiError(error).message);
    }
  }, [name, phoneNumber, remaingValidAuthCodeTime]);

  const handleSubmit = useCallback(async () => {
    try {
      await AccountAPI.Verification.confirm({
        name: name,
        phoneNumber: phoneNumber,
        authCode: authCode,
      });
      const data = await AccountAPI.Member.findUsername({
        name: name,
        phoneNumber: phoneNumber,
        authCode: authCode,
      });

      stashData('find-username-success', { ...data, name: name });
      router.push('/member/find/success');
    } catch (error) {
      console.error(error);

      alert(parseApiError(error).message);
    }
  }, [name, phoneNumber, authCode, router]);

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
    handleSendAuthCodeButtonClick: handleSendAuthCodeButtonClick,
    handleSubmit: handleSubmit,
    handleBackButtonClick: () => router.push('/member/login'),
  };

  return (
    <>
      <Desktop>
        <MemberFindUsernamePageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberFindUsernamePageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
