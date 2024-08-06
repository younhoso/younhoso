'use client';

import clsx from 'clsx';

import { membershipInstructionList } from '../pc/MembershipInstruction';
import { MembershipInstructionMobileStyled } from './styled';

export interface MembershipInstructionMobileProps {
  className?: string;
}

const MembershipInstructionMobile = ({ className }: MembershipInstructionMobileProps) => {
  return (
    <MembershipInstructionMobileStyled className={clsx('MembershipInstructionMobile', className)}>
      {Object.entries(membershipInstructionList).map(([key, value]) => (
        <div key={key}>
          <h4>{key}</h4>
          {value.map(v => (
            <p key={v}>{v}</p>
          ))}
        </div>
      ))}
    </MembershipInstructionMobileStyled>
  );
};

export default MembershipInstructionMobile;
