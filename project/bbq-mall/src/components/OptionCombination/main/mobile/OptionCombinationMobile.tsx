'use client';

import { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import closeBlack from '@/assets/images/components/close-black.svg';
import Stepper from '@/components/Stepper';
import { CombinedProductOption, Selected } from '@/types/productOption';
import { orderCount } from '@/utils/changeOrderCount';
import { getCustomMultiLevelOptions } from '@/utils/dataCustom';
import { comma } from '@/utils/regExp';

import { OptionCombinationMobileStyled } from './styled';

export interface OptionCombinationMobileProps {
  className?: string;
  data: CombinedProductOption;
  selected: Selected[];
  setSelected: Dispatch<SetStateAction<Selected[]>>;
}

const OptionCombinationMobile = ({
  className,
  data,
  selected,
  setSelected,
}: OptionCombinationMobileProps) => {
  const multiLevelOptions = getCustomMultiLevelOptions(data?.multiLevelOptions);
  const { changeOrderCount } = orderCount(setSelected);

  return (
    <OptionCombinationMobileStyled className={clsx('OptionCombinationMobile', className)}>
      <ul className="item-inner">
        {selected.map(
          (
            item: {
              key: string;
              value: string;
              productNo: number;
              optionNo: number;
              orderCnt: number;
              buyPrice: number;
            },
            index: number,
          ) => {
            const option = multiLevelOptions[item.key]?.find(
              option => option.value === String(item.value),
            );
            return (
              option && (
                <li key={index} className="item">
                  <div className="quantityPay-header">
                    <div className="value">{option.value}</div>
                    <Image
                      src={closeBlack}
                      alt="닫기버튼"
                      width={16}
                      height={16}
                      onClick={() => {
                        setSelected(prevSelected => {
                          return prevSelected.filter(
                            prevItem => prevItem.optionNo !== item.optionNo,
                          );
                        });
                      }}
                    />
                  </div>
                  <div className="quantityPay-body">
                    <Stepper
                      className="quantity"
                      defaultValue={item.orderCnt}
                      onChange={newValue => changeOrderCount(index, newValue)}
                      max={
                        data.multiLevelOptions.find(v => v.optionNo === item.optionNo)?.stockCnt ??
                        999
                      }
                    />
                    <div className="buyPrice">{comma(item.buyPrice * item.orderCnt)} 원</div>
                  </div>
                </li>
              )
            );
          },
        )}
      </ul>
    </OptionCombinationMobileStyled>
  );
};

export default OptionCombinationMobile;
