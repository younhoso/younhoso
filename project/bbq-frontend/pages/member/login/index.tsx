import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { Desktop, Mobile } from '@/components/functions';
import { MemberLoginPageTemplate } from '@/components/templates';
import { memberState, sessionState, useSidebarCart } from '@/stores';
import { stashData } from '@/utils';

export default function MemberLogin() {
  const router = useRouter();
  const { redirect_to } = router.query;

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const { reset: resetSidebarCart } = useSidebarCart();
  const refreshSessionState = useRecoilRefresher_UNSTABLE(sessionState);
  const refreshMemberState = useRecoilRefresher_UNSTABLE(memberState);

  const login = useCallback(async () => {
    if (!id || !id.trim().length) return alert('아이디를 입력해주세요.');
    if (!password || !password.length) return alert('패스워드를 입력해주세요.');

    const result = await signIn('member', {
      username: id,
      password: password,
      redirect: false,
      // ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}), // 이거 next-auth signIn 함수에서 작동 안됨.
    });
    if (result?.error) {
      const { code, message }: { code: string; message: string } = JSON.parse(result.error);

      if (code === 'INTEGRATION_REQUIRED') {
        stashData('member/login', { id: id });
        router.push('/member/integrate');
        return;
      }

      alert(message);
    } else {
      resetSidebarCart();
      //refreshSessionState();
      //refreshMemberState();
      window.location.href = redirect_to ? `${redirect_to}` : '/';
    }
  }, [id, password, rememberMe, redirect_to, resetSidebarCart]);

  const snsLogin = useCallback(
    async (type: string) => {
      try {
        const result = await signIn(type, {
          callbackUrl: redirect_to ? `${redirect_to}` : '/',
        });
      } catch (error) {
        console.error('error', error);
      }
    },
    [redirect_to],
  );

  return (
    <>
      <Desktop>
        <MemberLoginPageTemplate
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          login={login}
          snsLogin={snsLogin}
        />
      </Desktop>
      <Mobile>
        <MemberLoginPageTemplate.Mobile
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          login={login}
          snsLogin={snsLogin}
        />
      </Mobile>
    </>
  );
}
