import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { useCIModal } from '@/components/organisms';
import { MemberIntegrateVerifyWithCIPageTemplate } from '@/components/templates';
import { parseApiError, popData, stashData } from '@/utils';

export default function MemberIntegrateVerifyPage() {
  const router = useRouter();
  const { openCIModal, closeCIModal } = useCIModal();
  const [ciToken, setCiToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  // pop Data
  useEffect(() => {
    try {
      const data = popData<{
        id: string;
      }>('member/integrate', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });
      if (data && data.id) {
        setUsername(data.id);
      } else {
        router.push('/member/login');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // ciToken 인증시 이동
  useEffect(() => {
    if (!ciToken || !username) {
      return;
    }

    AccountAPI.Member.initFindAndChangePasswordWithCI({
      username,
      ciToken,
    })
      .then(({ username, token, isAlreadyIntegratedMember }) => {
        stashData('change-password', {
          username: username,
          token: token,
          isAlreadyIntegratedMember: isAlreadyIntegratedMember,
          integration: true,
          ciToken: ciToken,
        });
        router.push(`/member/find/change-password`);
      })
      .catch(error => {
        console.error(error);
        const data = parseApiError(error);
        alert(data.message);
      });
  }, [ciToken, username]);

  // 인증 버튼
  const handleVerifyButtonClick = useCallback(async () => {
    openCIModal({
      onSuccess: ({ ciToken }) => {
        setCiToken(ciToken);
      },
      onCancel: () => {
        closeCIModal();
      },
      onError: ({ error }) => {
        closeCIModal();
        console.error(error);
        alert(parseApiError(error).message);
        setCiToken(undefined);
      },
    });
  }, []);

  if (!username) {
    return null;
  }

  const props = {
    handleVerifyButtonClick: handleVerifyButtonClick,
    handleBackButtonClick: () => {},
  };

  return (
    <>
      <Desktop>
        <MemberIntegrateVerifyWithCIPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberIntegrateVerifyWithCIPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
