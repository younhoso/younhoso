'use client';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { MEMBER_GRADE_IMAGE_LIST, MemberGradeType } from '@/constant/memberGradeImageList';

import MembershiProgressBar from '../../MembershipProgressBar';
import { MembershipProgressStyled } from './styled';

export interface MembershipProgressProps {
  className?: string;
  nickname: string | undefined;
  memberGradeName: string | undefined;
  memberGradeData: MemberGradeType | undefined;
}

const MembershipProgress = ({
  className,
  nickname,
  memberGradeData,
  memberGradeName,
}: MembershipProgressProps) => {
  const index = Object.keys(MEMBER_GRADE_IMAGE_LIST).findIndex(v => v === memberGradeName);
  return (
    <MembershipProgressStyled className={clsx('MembershipProgress', className)}>
      <div className="membership-info">
        <Image
          src={memberGradeData?.image ?? MEMBER_GRADE_IMAGE_LIST.WELCOME.image}
          width={76}
          height={84}
          unoptimized
          alt="grade"
        />
        <div>
          <p>
            <span>{nickname}</span>님의 등급은 <span>{memberGradeName}</span>입니다.
          </p>
          <p>{memberGradeData?.nextMonth}</p>
          <p>
            현재등급 산정 기간 {dayjs(new Date()).startOf('month').format('YY.MM.DD')} -{' '}
            {dayjs(new Date()).endOf('month').format('YY.MM.DD')}
          </p>
        </div>
      </div>
      <MembershiProgressBar index={index} />
    </MembershipProgressStyled>
  );
};

export default MembershipProgress;
