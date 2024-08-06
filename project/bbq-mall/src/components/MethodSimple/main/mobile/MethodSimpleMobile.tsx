'use client';

import Image from 'next/image';

import clsx from 'clsx';

import kakaoPay from '@/assets/images/components/kakao-pay.png';
import payco from '@/assets/images/components/payco.png';
import Divider from '@/components/Divider';
import Radio from '@/components/Radio';

import { MethodSimpleProps } from '../pc/MethodSimple';
import { MethodSimpleMobileStyled } from './styled';

const MethodSimpleMobile = ({ className, onChangeValue }: MethodSimpleProps) => {
  return (
    <MethodSimpleMobileStyled className={clsx('MethodSimpleMobile', className)}>
      <div className="virtual-radio-wrapper">
        <Radio.Mobile
          radioList={[
            {
              label: (
                <div className="image-wrapper">
                  <Image src={kakaoPay} width={78} height={18} alt="kakao-pay" />
                </div>
              ),
              value: 'KAKAO_PAY',
            },
            {
              label: (
                <div className="image-wrapper">
                  <Image src={payco} width={61} height={14} alt="kakao-pay" />
                </div>
              ),
              value: 'PAYCO',
            },
          ]}
          onChange={e => onChangeValue?.({ payType: e })}
          defaultValue="KAKAO_PAY"
        />
      </div>
      <Divider marginTop="8px" />
      <ul>
        <li>현금영수증은 카카오페이가 직접 발행합니다.</li>
        <li>
          결제 및 사용관련 문의는 카카오페이 고객센터(1644-7405 / 평일 9:00~18:00)로 부탁드립니다.
        </li>
        <li>
          간편결제는 비비큐몰이 제공하는 무이자 할부와 무관하며, 서비스사의 별도 기준이 적용되니
          자세한 내용은 해당 서비스사를 확인해 주세요.
        </li>
      </ul>
    </MethodSimpleMobileStyled>
  );
};

export default MethodSimpleMobile;
