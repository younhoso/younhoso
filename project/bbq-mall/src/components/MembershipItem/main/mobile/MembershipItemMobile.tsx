'use client';

import Image from 'next/image';

import clsx from 'clsx';

import couponIcon from '@/assets/images/components/coupon-icon.svg';
import profitBadge from '@/assets/images/components/profit-badge.svg';

import { MembershipItemProps } from '../pc/MembershipItem';
import { MembershipItemMobileStyled } from './styled';

const MembershipItemMobile = ({
  className,
  memberGradeName,
  memberGradeData,
}: MembershipItemProps) => {
  return (
    <MembershipItemMobileStyled className={clsx('MembershipItemMobile', className)}>
      <div className="membership-item-profile">
        <Image src={memberGradeData.image} width={58} height={62} alt="profile" unoptimized />
        <p>{memberGradeName}</p>
        등급
      </div>
      <div className="membership-item-description">
        <p>
          전월 구매 <span>{memberGradeData.limit}</span>
        </p>
        <p>
          <Image src={profitBadge} width={12.8} height={12.8} alt="profit-badge" />
          {memberGradeData.benefit}
        </p>
        {memberGradeData.coupons.map(v => (
          <p key={v}>
            <Image src={couponIcon} width={16} height={16} alt="coupon-icon" />
            {v}
          </p>
        ))}
      </div>
    </MembershipItemMobileStyled>
  );
};

export default MembershipItemMobile;
