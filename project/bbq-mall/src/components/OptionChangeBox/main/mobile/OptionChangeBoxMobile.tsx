'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import downArrow from '@/assets/images/components/arrow-down.svg';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { CombinedProductOption, Selected } from '@/types/productOption';
import { getCustomMultiLevelOptions } from '@/utils/dataCustom';

import { OptionChangeBoxMobileStyled } from './styled';

export interface OptionChangeBoxMobileProps {
  className?: string;
  slug?: string;
  data?: CombinedProductOption;
  onChange: (v: {
    value: string;
    productNo: number;
    optionNo: number;
    orderCnt: number;
    buyPrice: number;
    key: string;
  }) => void;
}

const OptionChangeBoxMobile = ({ className, slug, data, onChange }: OptionChangeBoxMobileProps) => {
  const multiLevelOptions = getCustomMultiLevelOptions(data?.multiLevelOptions);
  const [open, setOpen] = useState(false);

  const selectRef = useHandleClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <OptionChangeBoxMobileStyled
      className={clsx('OptionChangeBoxMobile', className)}
      ref={selectRef}
    >
      {multiLevelOptions &&
        Object.entries(multiLevelOptions)?.map(([key, value], idx) => (
          <div key={idx} className="label-wrapper">
            <div className={clsx('select-content')}>
              <div className="select-wrapper" onClick={() => setOpen(!open)}>
                <div className={clsx(!value && 'placeholder')}>[필수] 옵션을 선택해주세요</div>
                <Image width={16} height={16} src={downArrow} alt="select_arrow" />
              </div>
            </div>
            {open && (
              <div className="select-option-list">
                {multiLevelOptions[key]?.map(v => {
                  return (
                    <div
                      className={clsx(!v.stockCnt && 'sold-out')}
                      key={v.value}
                      onClick={() => {
                        if (!v.stockCnt) {
                          return;
                        }
                        setOpen(false);
                        onChange({
                          value: v.value,
                          productNo: Number(slug),
                          optionNo: v.optionNo,
                          orderCnt: v.orderCnt,
                          buyPrice: v.buyPrice,
                          key,
                        });
                      }}
                    >
                      <div>
                        {v.value}
                        {!!v.addPrice && ` (+${v.addPrice.toLocaleString()}원)`}
                      </div>
                      {!v.stockCnt && <div>(품절)</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
    </OptionChangeBoxMobileStyled>
  );
};

export default OptionChangeBoxMobile;
