import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis/account';
import { useModal } from '@/components/molecules';
import { useCIModal } from '@/components/organisms';
import { AlreadyRegisteredPopup } from '@/components/organisms/popups/AlreadyRegisteredPopup';
import { parseApiError, stashData } from '@/utils';

export default function MemberVerifyWithCI() {
  const router = useRouter();
  const { openModal } = useModal();
  const { registrationKey } = router.query;
  const { openCIModal, closeCIModal } = useCIModal();
  const [ciToken, setCiToken] = useState<string | undefined>(undefined);

  // CI 본인 인증 창 띄우기
  useEffect(() => {
    if (!router) {
      return;
    }

    openCIModal({
      onSuccess: ({ ciToken }) => {
        setCiToken(ciToken);
      },
      onCancel: () => {
        closeCIModal();
        router.replace('/member/login');
      },
      onError: ({ error }) => {
        closeCIModal();
        console.error(error);
        alert(parseApiError(error).message);
        router.replace('/member/login');
      },
    });
  }, [router]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (typeof ciToken === 'undefined') {
      return;
    }

    if (ciToken) {
      AccountAPI.Member.initRegistrationWithCI({
        ciToken: ciToken,
      })
        .then(({ isRegistered, username, name, phoneNumber, birth, gender }) => {
          // 이미 가입된 상태
          if (isRegistered) {
            // 소셜 연동
            if (registrationKey) {
              AccountAPI.Member.connectOAuthWithCI({
                registrationKey: registrationKey as string,
                username: username!,
                ciToken: ciToken,
              })
                .then(res => {
                  alert('소셜 계정과 연동이 완료되었습니다.\n다시 로그인해주세요.');
                  router.push('/member/login');
                })
                .catch(err => {
                  console.error(err);
                  alert(parseApiError(err).message);
                });
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
              birth: birth,
              gender: gender,
              ciToken: ciToken,
            });
            router.push(
              `/member/join${registrationKey ? `?registrationKey=${registrationKey}` : ''}`,
            );
          }
        })
        .catch(error => {
          closeCIModal();
          console.error(error);
          alert(parseApiError(error).message);
          router.replace('/member/login');
        });
    } else {
      alert('본인 인증에 실패하였습니다.');
      router.reload();
    }
  }, [ciToken, router.isReady]);

  return <div style={{ height: '65vh' }}></div>;
}
