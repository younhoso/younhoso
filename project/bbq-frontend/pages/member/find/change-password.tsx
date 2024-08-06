import { signIn } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { AccountAPI } from '@/apis/account';
import { Desktop, Mobile } from '@/components/functions';
import { MemberChangePasswordWithCIPageTemplate } from '@/components/templates';
import { memberState, sessionState } from '@/stores';
import { parseApiError, popData, stashData, validatePassword } from '@/utils';

export default function MemberFindChangePasswordPage() {
  const router = useRouter();
  const refreshSessionState = useRecoilRefresher_UNSTABLE(sessionState);
  const refreshMemberState = useRecoilRefresher_UNSTABLE(memberState);

  const [ciToken, setCiToken] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string>('');
  const [isAlreadyIntegratedMember, setIsAlreadyIntegratedMember] = useState<boolean>(false);
  const [integration, setIntegration] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [defaultUserName, setDefaultUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState<string>('');
  const [name, setName] = useState<string>('');

  // password input blur 이벤트
  const handlePasswordConfirmInputBlur = useCallback(async () => {
    if (password.length && passwordConfirm.length && password !== passwordConfirm) {
      setPasswordConfirmErrorMessage('입력하신 비밀번호와 일치 하지 않습니다.');
    } else {
      setPasswordConfirmErrorMessage('');
    }
  }, [password, passwordConfirm]);

  // password input blur 이벤트
  const handlePasswordInputBlur = useCallback(async () => {
    if (password.length && !validatePassword(password)) {
      setPasswordErrorMessage('영문+특수문자 포함 8자이상 (조건이 맞지 않습니다.)');
    } else {
      setPasswordErrorMessage('');
    }
    handlePasswordConfirmInputBlur();
  }, [password, handlePasswordConfirmInputBlur]);

  const handleConfirmButtonClick = useCallback(async () => {
    try {
      const data = await AccountAPI.Member.processFindAndChangePassword({
        token,
        newPassword: password,
      });

      // 1. 통합 유저 전환 -> 로그인 및 환영 페이지로 전환
      if (isAlreadyIntegratedMember) {
        const result = await signIn('member', {
          username: username,
          password: password,
          redirect: false,
        });
        if (result?.error) {
          alert(`로그인에 실패하였습니다. (message: ${result?.error})`);
        } else {
          refreshSessionState();
          refreshMemberState();
          router.push('/member/integrate/complete');
        }
      }
      // 2. 일반 비밀번호 변경 -> 모달 출력후 마이페이지로 이동
      else {
        alert('비밀번호를 성공적으로 변경했습니다.'); // TODO: modal

        stashData('login-username', data.username);
        router.push('/member/login');
      }
    } catch (error) {
      console.error(error);

      alert(parseApiError(error).message);
    }
  }, [token, username, password, passwordConfirm, isAlreadyIntegratedMember]);

  // 데이터 불러오기
  useEffect(() => {
    if (!router) {
      return;
    }

    try {
      // popData (change password)
      const data = popData<{
        username: string;
        name?: string;
        token: string;
        ciToken?: string;
        isAlreadyIntegratedMember: boolean;
        integration?: boolean;
      }>('change-password', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });

      // ciToken 설정 -> 없으면 처음으로 이동
      if (data && data.ciToken) {
        setCiToken(data.ciToken);
      } else {
        router.replace('/member/find');
        return;
      }

      if (data && data.username) {
        setUsername(data.username);
        setDefaultUsername(data.username);
      }

      if (data && data.name) {
        setName(data.name);
      }

      if (data && data.token) {
        setToken(data.token);
      }

      if (data && data.isAlreadyIntegratedMember) {
        setIsAlreadyIntegratedMember(data.isAlreadyIntegratedMember);
      }

      if (data && data.integration) {
        setIntegration(data.integration);
      }
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  const props = {
    token: token,
    integration: integration,
    isAlreadyIntegratedMember: isAlreadyIntegratedMember,
    name: name,
    defaultUserName: defaultUserName,
    setName: setName,
    username: username,
    setUsername: setUsername,
    password: password,
    setPassword: setPassword,
    handlePasswordInputBlur: handlePasswordInputBlur,
    passwordErrorMessage: passwordErrorMessage,
    passwordConfirm: passwordConfirm,
    setPasswordConfirm: setPasswordConfirm,
    handlePasswordConfirmInputBlur: handlePasswordConfirmInputBlur,
    passwordConfirmErrorMessage: passwordConfirmErrorMessage,
    handleConfirmButtonClick: handleConfirmButtonClick,
  };

  return (
    <>
      <Desktop>
        <MemberChangePasswordWithCIPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberChangePasswordWithCIPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
