'use client';

import clsx from 'clsx';

import MembershipItem from '@/components/MembershipItem';
import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';

import { MembershipListMobileStyled } from './styled';

export interface MembershipListMobileProps {
  className?: string;
}

const MembershipListMobile = ({ className }: MembershipListMobileProps) => {
  return (
    <MembershipListMobileStyled className={clsx('MembershipListMobile', className)}>
      <h3>등급별 혜택</h3>
      <div className="membership-list-description">
        <p>비비큐 주문앱, 비비큐몰 합산 결제 금액에 따라 등급이 부여됩니다.</p>
        <p>전월 결제 금액 기준으로 매월 1일 등급이 부여됩니다. (일부품목 제외)</p>
      </div>
      <div className="membership-item-wrppaer">
        {Object.entries(MEMBER_GRADE_IMAGE_LIST).map(([key, value]) => (
          <MembershipItem.Mobile key={key} memberGradeName={key} memberGradeData={value} />
        ))}
      </div>
    </MembershipListMobileStyled>
  );
};

export default MembershipListMobile;
