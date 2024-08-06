'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import Divider from '@/components/Divider';
import MembershipInstruction from '@/components/MembershipInstruction';
import MembershipList from '@/components/MembershipList';
import MembershipProgress from '@/components/MembershipProgress';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { MobileMyMembershipPageStyled } from '@/styles/pageStyled/mobile/mobileMyMembershipPageStyled';
import { MyData } from '@/types';

const MobileMyMembership = () => {
  const { isSignIn } = useHandleIsSignIn();
  const { data: myData, refetch } = useQuery({
    queryKey: ['/profile'],
    queryFn: async ({ queryKey: [key] }) => {
      const res = await customAxios(PLATFORMLIST.MOBILE_WEB).get<MyData>(key);
      const memberGrade = MEMBER_GRADE_IMAGE_LIST[res.data.memberGradeName];

      return { ...res, memberGrade };
    },
    enabled: false,
  });

  useEffect(() => {
    if (isSignIn) {
      refetch();
    }
  }, [isSignIn]);

  return (
    <MobileMyMembershipPageStyled>
      {isSignIn && (
        <>
          <MembershipProgress.Mobile
            nickname={myData?.data.memberName}
            memberGradeData={myData?.memberGrade}
            memberGradeName={myData?.data.memberGradeName}
          />
          <Divider.Mobile />
        </>
      )}
      <MembershipList.Mobile />
      <MembershipInstruction.Mobile />
    </MobileMyMembershipPageStyled>
  );
};

export default MobileMyMembership;
