import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { debounce } from 'lodash';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { SelectBirthPopup } from '@/components/organisms';
import { MemberJoinNewPageTemplate } from '@/components/templates';
import { parseApiError, popData, stashData, validateEmail, validatePassword } from '@/utils';

export default function MemberJoinNew() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

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
  const [phoneVerificationKey, setPhoneVerificationKey] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [date, setDate] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string>('');

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
      const data = await AccountAPI.Member.processRegistration({
        username,
        password,
        email,
        phoneVerificationKey: phoneVerificationKey!,
        ...(date ? { birth: date } : {}),
        ...(gender ? { gender: gender } : {}),
        ...(registrationKey && { registrationKey: registrationKey as string }),
      });

      // 소셜 연동
      if (registrationKey) {
        try {
          await AccountAPI.Member.connectOAuth({
            registrationKey: registrationKey as string,
            username: username,
            phoneVerificationKey: phoneVerificationKey!,
          });
        } catch (err) {
          console.error(err);
          alert(parseApiError(err).message);
        }
      }

      stashData('register-member-process-success', data);
      router.push('/member/join/complete');
    } catch (error) {
      alert(parseApiError(error).message);
    }
  }, [username, password, email, phoneVerificationKey, date, gender, registrationKey]);

  // username 버튼 클릭 이벤트
  const handleCheckUsernameButtonClick = useCallback(async () => {
    checkUsernameAvailable({
      username,
      callback: available => {
        setUsernameStatus(available ? 'AVAILABLE' : 'UNAVAILABLE');
      },
    });
  }, [username]);

  // 날짜 input 클릭 이벤트
  const handleDateInputClick = useCallback(() => {
    openModal({
      title: '생일 입력',
      body: (
        <SelectBirthPopup
          birth={date && date.length ? date : undefined}
          setBirth={(value: string) => setDate(value)}
          title={
            <>
              생일 입력하시고 쿠폰과
              <br />
              다양한 이벤트 혜택을 받아보세요!
            </>
          }
        />
      ),
    });
  }, [date]);

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
        phoneVerificationKey: string;
      }>('phone-verification', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });

      const name = data?.name;
      const phoneNumber = data?.phoneNumber;
      const phoneVerificationKey = data?.phoneVerificationKey;

      if (
        name &&
        name.length &&
        phoneNumber &&
        phoneNumber.length &&
        phoneVerificationKey &&
        phoneVerificationKey.length
      ) {
        setName(name);
        setPhoneNumber(phoneNumber);
        setPhoneVerificationKey(phoneVerificationKey);
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
    !phoneVerificationKey ||
    !phoneVerificationKey.length
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
    date: date,
    handleDateInputClick: handleDateInputClick,
    gender: gender,
    setGender: setGender,
    handleSubmitButtonClick: handleSubmitButtonClick,
  };

  return (
    <>
      <Desktop>
        <MemberJoinNewPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberJoinNewPageTemplate.Mobile {...props} />
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
