import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis/account';
import { Flex, Text } from '@/components/atoms';
import { useCIModal } from '@/components/organisms';
import { PLANCK } from '@/constants';
import { parseApiError, stashData } from '@/utils';

export default function MemberFindUsernameWithCIPage() {
  const router = useRouter();
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
    if (typeof ciToken === 'undefined') {
      return;
    }

    if (ciToken) {
      AccountAPI.Member.findUsernameWithCI({
        ciToken: ciToken,
      })
        .then(data => {
          stashData('find-username-success', { ...data, ciToken });
          router.push('/member/find/success');
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
  }, [ciToken]);

  return <div style={{ height: '65vh' }}></div>;
}
