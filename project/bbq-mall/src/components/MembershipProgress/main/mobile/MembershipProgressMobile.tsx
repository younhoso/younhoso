'use client';

import Image from 'next/image';

import clsx from 'clsx';

import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';

import MembershiProgressBar from '../../MembershipProgressBar/main';
import { MembershipProgressProps } from '../pc/MembershipProgress';
import { MembershipProgressMobileStyled } from './styled';

const MembershipProgressMobile = ({
  className,
  nickname,
  memberGradeData,
  memberGradeName,
}: MembershipProgressProps) => {
  const index = Object.keys(MEMBER_GRADE_IMAGE_LIST).findIndex(v => v === memberGradeName);
  return (
    <MembershipProgressMobileStyled className={clsx('MembershipProgressMobile', className)}>
      <div className="membership-info">
        <Image
          src={memberGradeData?.image ?? MEMBER_GRADE_IMAGE_LIST.WELCOME.image}
          width={76}
          height={84}
          unoptimized
          alt="grade"
        />
        <div>
          <p className="membership-nickname">
            <span>{nickname}</span> 님은
          </p>
          <p className="membership-grade">
            <span>{memberGradeName}</span> 등급입니다.
          </p>
          <p className="membership-next-month">{memberGradeData?.nextMonth}</p>
        </div>
      </div>
      <MembershiProgressBar.Mobile index={index} />
    </MembershipProgressMobileStyled>
  );
};

export default MembershipProgressMobile;
