'use client';

import clsx from 'clsx';

import { MembershipInstructionStyled } from './styled';

export interface MembershipInstructionProps {
  className?: string;
}

export const membershipInstructionList = {
  '멤버십 안내': [
    '멤버십 등급은 최근 한달 동안의 구매 내역을 기준으로 매월 1일 오전 중에 등급이 변경됩니다.',
    '매월 지급되는 등급별 쿠폰은 1일에 자동 발급됩니다.',
    '구매 확정된 실 결제금액 기준으로 적용됩니다. (주문취소, 포인트 사용, 할인쿠폰 적용, 배송비 제외)',
    '각 쿠폰의 사용 조건 및 유효 기간은 마이페이지 > 쿠폰에서 확인할 수 있습니다.',
    '간편로그인 시에는 쿠폰 혜택 적용이 제한됩니다.',
    '할인 쿠폰은 할인 상품과 일부 상품에는 적용되지 않습니다.',
    '회원 혜택 및 선정 기준은 향후 변경될 수 있습니다.',
  ],
};

const MembershipInstruction = ({ className }: MembershipInstructionProps) => {
  return (
    <MembershipInstructionStyled className={clsx('MembershipInstruction', className)}>
      {Object.entries(membershipInstructionList).map(([key, value]) => (
        <div key={key}>
          <h4>{key}</h4>
          {value.map(v => (
            <p key={v}>{v}</p>
          ))}
        </div>
      ))}
    </MembershipInstructionStyled>
  );
};

export default MembershipInstruction;
