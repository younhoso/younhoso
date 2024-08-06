import { signIn } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { debounce } from 'lodash';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { MemberJoinNewWithCIPageTemplate } from '@/components/templates';
import { parseApiError, popData, stashData, validateEmail, validatePassword } from '@/utils';

export default function MemberJoinNew() {
  const router = useRouter();

  const { registrationKey } = router.query;
  const [username, setUsername] = useState<string>('');
  const [usernameStatus, setUsernameStatus] = useState<'NONE' | 'AVAILABLE' | 'UNAVAILABLE'>(
    'NONE',
  );
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [ciToken, setCiToken] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birth, setBirth] = useState<string>('');

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

  // email input blur 이벤트
  const handleEmailInputBlur = useCallback(async () => {
    if (email.length && !validateEmail(email)) {
      setEmailErrorMessage('올바르지 않은 이메일 형식입니다.');
    } else {
      setEmailErrorMessage('');
    }
  }, [email]);

  // 가입 버튼 클릭 이벤트
  const handleSubmitButtonClick = useCallback(async () => {
    try {
      const data = await AccountAPI.Member.processRegistrationWithCI({
        username,
        password,
        email,
        ciToken: ciToken!,
        ...(registrationKey && { registrationKey: registrationKey as string }),
        isSocial: false,
        isApple: false,
      });

      stashData('register-member-process-success', data);
      await signIn('sign_up', {
        refreshToken: data.refreshTokenInfo.refreshTokenString,
        expiresAt: data.refreshTokenInfo.expiresAt,
        accessToken: data.accessToken,
      });
      router.push('/member/join/complete');
    } catch (error) {
      alert(parseApiError(error).message);
    }
  }, [username, password, email, ciToken, registrationKey]);

  // username 버튼 클릭 이벤트
  const handleCheckUsernameButtonClick = useCallback(async () => {
    checkUsernameAvailable({
      username,
      callback: available => {
        setUsernameStatus(available ? 'AVAILABLE' : 'UNAVAILABLE');
        setUsernameErrorMessage(available ? '' : '사용할 수 없는 아이디입니다.');
      },
    });
  }, [username]);

  // username 변경시 usernameStatus 초기화
  useEffect(() => {
    setUsernameErrorMessage('');
  }, [username]);

  // password 변경시 passwordStatus 초기화
  useEffect(() => {
    setPasswordErrorMessage('');
  }, [password]);

  // passwordConfirm 변경시 passwordConfirmStatus 초기화
  useEffect(() => {
    setPasswordConfirmErrorMessage('');
  }, [passwordConfirm]);

  // 데이터 불러오기
  useEffect(() => {
    try {
      const data = popData<{
        name: string;
        phoneNumber: string;
        birth: string;
        gender: string;
        ciToken: string;
      }>('phone-verification', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });

      const name = data?.name;
      const phoneNumber = data?.phoneNumber;
      const birth = data?.birth;
      const gender = data?.gender;
      const ciToken = data?.ciToken;

      if (
        name &&
        name.length &&
        phoneNumber &&
        phoneNumber.length &&
        birth &&
        birth.length &&
        gender &&
        gender.length &&
        ciToken &&
        ciToken.length
      ) {
        setName(name);
        setPhoneNumber(phoneNumber);
        setBirth(birth);
        setGender(gender);
        setCiToken(ciToken);
      } else {
        router.push('/member/join/verify');
      }
    } catch (error) {
      console.error(error);
      router.push('/member/join/verify');
    }
  }, []);

  // 랜더링 지연
  if (
    !name ||
    !name.length ||
    !phoneNumber ||
    !phoneNumber.length ||
    !birth ||
    !birth.length ||
    !gender ||
    !gender.length ||
    !ciToken ||
    !ciToken.length
  ) {
    return <></>;
  }

  const props = {
    username: username,
    usernameStatus: usernameStatus,
    usernameErrorMessage: usernameErrorMessage,
    handleCheckUsernameButtonClick: handleCheckUsernameButtonClick,
    setUsername: setUsername,
    password: password,
    setPassword: setPassword,
    handlePasswordInputBlur: handlePasswordInputBlur,
    passwordErrorMessage: passwordErrorMessage,
    passwordConfirm: passwordConfirm,
    setPasswordConfirm: setPasswordConfirm,
    handlePasswordConfirmInputBlur: handlePasswordConfirmInputBlur,
    passwordConfirmErrorMessage: passwordConfirmErrorMessage,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    setEmail: setEmail,
    handleEmailInputBlur: handleEmailInputBlur,
    emailErrorMessage: emailErrorMessage,
    date: birth,
    gender: gender,
    handleSubmitButtonClick: handleSubmitButtonClick,
  };

  return (
    <>
      <Desktop>
        <MemberJoinNewWithCIPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberJoinNewWithCIPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}

const checkUsernameAvailable = debounce(
  async ({ username, callback }: { username: string; callback: (available: boolean) => void }) => {
    try {
      await AccountAPI.Member.checkUsername({ username });
      callback(true);
    } catch (e) {
      console.error(e);
      callback(false);
    }
    return;
  },
  1000,
  { leading: false },
);
