'use client';

import Image from 'next/image';

import clsx from 'clsx';

import couponIcon from '@/assets/images/components/coupon-icon.svg';
import profitBadge from '@/assets/images/components/profit-badge.svg';
import { MemberGradeType } from '@/constant/memberGradeImageList';

import { MembershipItemStyled } from './styled';

export interface MembershipItemProps {
  className?: string;
  memberGradeName: string;
  memberGradeData: MemberGradeType;
}

const MembershipItem = ({ className, memberGradeName, memberGradeData }: MembershipItemProps) => {
  return (
    <MembershipItemStyled className={clsx('MembershipItem', className)}>
      <div className="membership-item-profile">
        <Image src={memberGradeData.image} width={76} height={84} alt="profile" unoptimized />
        <p>{memberGradeName}</p>
      </div>
      <div className="membership-item-description">
        <p>
          전월 구매 <span>{memberGradeData.limit}</span>
        </p>
        <p>
          <Image src={profitBadge} width={16} height={16} alt="profit-badge" />
          {memberGradeData.benefit}
        </p>
        {memberGradeData.coupons.map(v => (
          <p key={v}>
            <Image src={couponIcon} width={20} height={20} alt="coupon-icon" />
            {v}
          </p>
        ))}
      </div>
    </MembershipItemStyled>
  );
};

export default MembershipItem;
