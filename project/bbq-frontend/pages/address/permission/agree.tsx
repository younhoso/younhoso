import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { AddressPermissionAgreePageTemplate } from '@/components/templates';
import { useAuth } from '@/hooks';
import { parseApiError } from '@/utils';

export default function AddressPermissionAgree() {
  const router = useRouter();
  const { session, member, defaultAddress } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [agreement1Checked, setAgreement1Checked] = useState<boolean>(false);
  const [agreement2Checked, setAgreement2Checked] = useState<boolean>(false);
  const [agreement3Checked, setAgreement3Checked] = useState<boolean>(false);
  const [agreement4Checked, setAgreement4Checked] = useState<boolean>(false);

  // 멤버를 못 불러오면 -> 비회원으로 인지 -> 바로 검색으로 이동
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof member === 'undefined') return;
    if (typeof defaultAddress === 'undefined') return;
    if (!member || defaultAddress) {
      router.replace({ pathname: '/address/search', query: router.query });
    } else {
      setLoading(false);
    }
  }, [member, defaultAddress, router.query, router.isReady]);

  // 마케팅 동의 기본 값 가져오기
  useEffect(() => {
    if (!member) return;
    setAgreement4Checked(
      member.smsMarketingAgreedAt && member.emailMarketingAgreedAt ? true : false,
    );
  }, [member]);

  const handleNextButtonClick = useCallback(async () => {
    if (!session || !agreement1Checked || !agreement2Checked || !agreement3Checked) return;

    // 멤버의 경우에만 저장한다.
    if (member) {
      if (agreement4Checked && (!member.smsMarketingAgreedAt || !member.emailMarketingAgreedAt)) {
        try {
          await AccountAPI.Member.modify({
            email: member.email!,
            birth: member.birth!,
            gender: member.gender!,
            isSmsMarketingAgreed: true,
            isEmailMarketingAgreed: !!member.pushMarketingAgreedAt,
            isPushMarketingAgreed: true,
          });
          // TODO: memberState 재로드 필요
        } catch (error) {
          console.error(error);
          alert(parseApiError(error).message);
        }
      }
    }

    router.push({
      pathname: '/address/search',
      query: router.query,
    });
  }, [
    session,
    member,
    agreement1Checked,
    agreement2Checked,
    agreement3Checked,
    agreement4Checked,
    router.query,
  ]);

  if (!session) return null;

  const props = {
    agreement1Checked: agreement1Checked,
    setAgreement1Checked: setAgreement1Checked,
    agreement2Checked: agreement2Checked,
    setAgreement2Checked: setAgreement2Checked,
    agreement3Checked: agreement3Checked,
    setAgreement3Checked: setAgreement3Checked,
    showAgreement4: true,
    agreement4Checked: agreement4Checked,
    setAgreement4Checked: setAgreement4Checked,
    handleNextButtonClick: handleNextButtonClick,
  };

  return (
    <>
      <Desktop>
        <AddressPermissionAgreePageTemplate {...props} />
      </Desktop>
      <Mobile>
        <AddressPermissionAgreePageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
