'use client';

import clsx from 'clsx';

import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';

import { MembershipProgressBarStyled, PrsentBarStyled } from './styled';

export interface MembershiProgressBarProps {
  className?: string;
  index: number;
}

const MembershipProgressBar = ({ className, index }: MembershiProgressBarProps) => {
  return (
    <MembershipProgressBarStyled className={clsx('MembershipProgressBar', className)}>
      {Object.entries(MEMBER_GRADE_IMAGE_LIST).map(([key, value], i, arr) => (
        <div key={key} className={clsx(index === i && 'active')}>
          <div className="progress-bar" />
          <p>{key}</p>
          {i === index && (
            <PrsentBarStyled
              $maxLength={arr.length}
              $index={index}
              $backgroundColor={value.backgroundColor}
            >
              <div>
                <div />
              </div>
            </PrsentBarStyled>
          )}
        </div>
      ))}
    </MembershipProgressBarStyled>
  );
};

export default MembershipProgressBar;
