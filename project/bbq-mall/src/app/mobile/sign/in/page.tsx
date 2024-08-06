'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import logo from '@/assets/images/header/logo.svg';
import google from '@/assets/images/sign/google-icon.svg';
import kakao from '@/assets/images/sign/kakao-icon.svg';
import naver from '@/assets/images/sign/naver-icon.svg';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { webviewLogin } from '@/hooks/useHandleWebview';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileSignInPageStyled } from '@/styles/pageStyled/mobile/mobileSignInPageStyled';
import { isWebview } from '@/utils/isWebView';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/localStorage';

const MobileSignIn = () => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const idRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const savedId = getLocalStorageItem<string>('saved-id');
  const [checked, setChecked] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: savedId ?? '',
      password: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setChecked(!!savedId);
  }, []);

  const onClickSNSLogin = async (type: string) => {
    await signIn(type, { callbackUrl: '/' });
  };

  const onChangeCheckbox = (_checked: boolean) => {
    setChecked(_checked);
    if (!_checked) {
      removeLocalStorageItem('saved-id');
    }
  };

  const submitForm = handleSubmit(
    async body => {
      if (isWebview) {
        return webviewLogin();
      }

      const { username, password } = body;

      setIsLoading(true);
      const res = await signIn('member', {
        username,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setIsLoading(false);
        return setConfirmModalOpen({
          open: true,
          content: '아이디와 비밀번호를 확인해주세요.',
          onOk: resetConfirmModalOpen,
        });
      }

      if (checked) {
        setLocalStorageItem('saved-id', username);
      }

      window.location.replace('/');
    },
    error => {
      return setConfirmModalOpen({
        open: true,
        content: Object.values(error)[0].message ?? '',
        onOk: resetConfirmModalOpen,
      });
    },
  );

  const idRelated = register('username', { required: '아이디를 입력해주세요.' });
  const passwordRelated = register('password', { required: '패스워드를 입력해주세요.' });

  return (
    <MobileSignInPageStyled>
      <Header.Mobile title="" hasCart={false} removeSticky />
      <form
        onSubmit={submitForm}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            idRef.current?.blur();
            passwordRef.current?.blur();
            submitForm();
          }
        }}
      >
        <Image src={logo} width={100} height={46} alt="bbq-logo" className="logo-image" />
        <Input.Mobile
          placeholder="아이디를 입력해주세요"
          autoComplete="username"
          {...idRelated}
          ref={e => {
            idRelated.ref(e);
            idRef.current = e;
          }}
        />
        <Input.Mobile
          placeholder="비밀번호를 입력해주세요"
          autoComplete="current-password"
          {...passwordRelated}
          ref={e => {
            passwordRelated.ref(e);
            passwordRef.current = e;
          }}
          type="password"
        />
        <div className="login-check-up">
          <div>
            <Checkbox
              checked={checked}
              onChange={e => {
                onChangeCheckbox(e.target.checked);
              }}
            />
            <div onClick={() => onChangeCheckbox(!checked)}>아이디 저장</div>
          </div>
          <div onClick={() => window.open('https://bbq.co.kr/member/find')}>
            <div>아이디</div> <span> &#183;</span>
            <div>비밀번호 찾기</div>
          </div>
        </div>

        <Button
          styleType="main"
          size="small"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          로그인하기
        </Button>
        <Button
          styleType="sub"
          size="small"
          className="sign-up"
          type="button"
          onClick={() => window.open('https://bbq.co.kr/member/join/verify')}
        >
          회원가입하기
        </Button>
        {process.env.NODE_ENV !== 'production' && (
          <Button
            className="sign-up"
            type="button"
            size="small"
            onClick={() => {
              setValue('username', process.env.NEXT_PUBLIC_TEST_BBQ_ID);
              setValue('password', process.env.NEXT_PUBLIC_TEST_BBQ_PASS);
            }}
          >
            TEST login
          </Button>
        )}
        <div className="login-with-sns">SNS 계정으로 로그인하기</div>
        <div className="sns-button-wrapper">
          <Image
            src={naver}
            width={64}
            height={64}
            alt="naver-login"
            onClick={() => onClickSNSLogin('naver')}
          />
          <Image
            src={kakao}
            width={64}
            height={64}
            alt="kakao-login"
            onClick={() => onClickSNSLogin('kakao')}
          />
          <Image
            src={google}
            width={64}
            height={64}
            alt="google-login"
            onClick={() => onClickSNSLogin('google')}
          />
        </div>
        <Button
          type="button"
          className="guest-order-check"
          size="small"
          onClick={() => router.push('/order/check/guest')}
        >
          비회원 주문조회
        </Button>
        <div className="copyright">Copyright 2024 © GENESIS BBQ</div>
      </form>
    </MobileSignInPageStyled>
  );
};

export default MobileSignIn;
