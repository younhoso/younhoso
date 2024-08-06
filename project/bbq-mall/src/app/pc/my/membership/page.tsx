'use client';

import { useQuery } from '@tanstack/react-query';

import MembershipInstruction from '@/components/MembershipInstruction';
import MembershipList from '@/components/MembershipList';
import MembershipProgress from '@/components/MembershipProgress';
import PageTitle from '@/components/PageTitle';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';
import { customAxios } from '@/libs/customAxios';
import { PcMyMembershipPageStyled } from '@/styles/pageStyled/pc/pcMyMembershipPageStyled';
import { MyData } from '@/types';

const PcMyMembership = () => {
  const { data: myData } = useQuery({
    queryKey: ['/profile'],
    queryFn: async ({ queryKey: [key] }) => {
      const res = await customAxios(PLATFORMLIST.PC).get<MyData>(key);
      const memberGrade = MEMBER_GRADE_IMAGE_LIST[res.data.memberGradeName];

      return { ...res, memberGrade };
    },
  });

  return (
    <PcMyMembershipPageStyled>
      <PageTitle title="멤버십 등급" />
      <MembershipProgress
        nickname={myData?.data.memberName}
        memberGradeData={myData?.memberGrade}
        memberGradeName={myData?.data.memberGradeName}
      />
      <MembershipList />
      <MembershipInstruction />
    </PcMyMembershipPageStyled>
  );
};

export default PcMyMembership;
