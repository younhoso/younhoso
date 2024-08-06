import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Desktop, Mobile } from '@/components/functions';
import { MemberFindUsernameSuccessPageTemplate } from '@/components/templates';
import { FindAccountMemberUsernameAPIResponse } from '@/types';
import { parseApiError, popData, stashData } from '@/utils';

export default function MemberFindSuccessPage() {
  const router = useRouter();

  const [data, setData] = useState<
    | (FindAccountMemberUsernameAPIResponse & {
        name?: string;
        ciToken?: string;
      })
    | undefined
  >(undefined);

  const handleConfirmButtonClick = useCallback(() => {
    stashData('login-username', data?.username);
    router.push('/member/login');
  }, [data]);

  const handleResetPasswordButtonClick = useCallback(async () => {
    try {
      stashData('change-password', {
        ...data,
        name: data?.name ?? undefined,
        ciToken: data?.ciToken ?? undefined,
      });
      router.push('/member/find/change-password');
    } catch (error) {
      console.error(error);

      alert(parseApiError(error).message);
    }
  }, [data]);

  useEffect(() => {
    try {
      const data = popData<
        FindAccountMemberUsernameAPIResponse & {
          name?: string;
          ciToken?: string;
        }
      >('find-username-success', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });

      if (data) {
        setData(data);
      } else {
        router.push('/member/find');
      }
    } catch (error) {
      console.error(error);
      router.push('/member/find');
    }
  }, []);

  if (!data || !data.username || !data.username.length) {
    return null;
  }

  const props = {
    username: data.username,
    handleConfirmButtonClick: handleConfirmButtonClick,
    handleResetPasswordButtonClick: handleResetPasswordButtonClick,
    handleBackButtonClick: () => router.push('/member/login'),
  };

  return (
    <>
      <Desktop>
        <MemberFindUsernameSuccessPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberFindUsernameSuccessPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
