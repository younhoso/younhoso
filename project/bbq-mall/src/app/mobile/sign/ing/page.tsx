'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { confirmModalOpenStore } from '@/stores/confirmModalOpen';

const MobileSignIng = () => {
  const searchParam = useSearchParams();
  const accessToken = searchParam.get('access_token');
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace('/');
    }

    (async () => {
      try {
        const trySignIn = async () => {
          const res = await signIn('bbq', {
            accessToken,
            redirect: false,
          });
          if (!res?.ok) {
            router.replace('/');
            throw {
              response: { data: { message: '액세스 토큰이 올바르지 않습니다.' } },
            };
          }

          return res;
        };

        const res = await trySignIn();

        if (res.url?.includes('csrf=true')) {
          await trySignIn();
        }

        window.location.replace('/');
      } catch (e: any) {
        return;
        setConfirmModalOpen({
          open: true,
          content: e?.response?.data?.message,
          onOk: resetConfirmModalOpen,
        });
      }
    })();
  }, [accessToken]);

  return <></>;
};

export default MobileSignIng;
