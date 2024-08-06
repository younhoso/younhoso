import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { MemberJoinCompletePageTemplate } from '@/components/templates';
import { popData } from '@/utils';

export default function MemberComplete() {
  const router = useRouter();

  const [memberId, setMemberId] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [birth, setBirth] = useState<string | undefined>(undefined);
  const [agreeMarketing, setAgreeMarketing] = useState<boolean | undefined>(undefined);
  const [marketingAgreementToken, setMarketingAgreementToken] = useState<string | undefined>(
    undefined,
  );

  // 데이터 불러오기
  useEffect(() => {
    try {
      const data = popData<{
        memberId: string;
        name: string;
        email: string;
        phoneNumber: string;
        birth?: string;
        marketingAgreementToken: string;
      }>('register-member-process-success', {
        deleteAfter: 5, // NOTE: 5초 후에 삭제 (useEffect가 여러 번 실행되는 현상 대응)
      });

      if (
        data?.memberId &&
        data?.name &&
        data?.email &&
        data?.phoneNumber &&
        data?.marketingAgreementToken
      ) {
        setMemberId(data.memberId);
        setName(data.name);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setBirth(data.birth ?? '(정보 없음)');
        setMarketingAgreementToken(data.marketingAgreementToken);
      } else {
        router.push('/member/join/verify');
      }
    } catch (error) {
      console.error(error);
      router.push('/member/join/verify');
    }
  }, []);

  // 마케팅 체크/미체크시 API호출
  useEffect(() => {
    if (!marketingAgreementToken) return;
    if (typeof agreeMarketing === 'boolean') {
      AccountAPI.Member.modifyMarketingAgreementsWithRegistrationToken({
        token: marketingAgreementToken,
        agreements: {
          smsMarketing: agreeMarketing,
          emailMarketing: agreeMarketing,
          pushMarketing: false,
        },
      });
    }
  }, [agreeMarketing, marketingAgreementToken]);

  // 랜더링 지연
  if (!memberId || !name || !email || !phoneNumber || !birth || !marketingAgreementToken) {
    return <></>;
  }

  const props = {
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    birth: birth,
    agreeMarketing: agreeMarketing,
    setAgreeMarketing: setAgreeMarketing,
  };

  return (
    <>
      <Desktop>
        <MemberJoinCompletePageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MemberJoinCompletePageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
