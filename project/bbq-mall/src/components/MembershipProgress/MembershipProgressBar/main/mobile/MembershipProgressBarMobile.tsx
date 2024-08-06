'use client';

import clsx from 'clsx';

import { MEMBER_GRADE_IMAGE_LIST } from '@/constant/memberGradeImageList';

import { MembershiProgressBarProps } from '../pc/MembershipProgressBar';
import { MembershipProgressBarMobileStyled, MobilePresentBarStyled } from './styled';

const MembershipProgressBarMobile = ({ className, index }: MembershiProgressBarProps) => {
  return (
    <MembershipProgressBarMobileStyled className={clsx('MembershiProgressBarMobile', className)}>
      {Object.entries(MEMBER_GRADE_IMAGE_LIST).map(([key, value], i, arr) => (
        <div key={key} className={clsx(index === i && 'active')}>
          <div className="progress-bar" />
          <p>{key}</p>
          {i === index && (
            <MobilePresentBarStyled
              $maxLength={arr.length}
              $index={index}
              $backgroundColor={value.backgroundColor}
            >
              <div>
                <div />
              </div>
            </MobilePresentBarStyled>
          )}
        </div>
      ))}
    </MembershipProgressBarMobileStyled>
  );
};

export default MembershipProgressBarMobile;
