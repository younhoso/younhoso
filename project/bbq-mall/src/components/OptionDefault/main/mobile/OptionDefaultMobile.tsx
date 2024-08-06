'use client';

import { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

import Stepper from '@/components/Stepper';
import { CombinedProductOption, Selected } from '@/types/productOption';
import { orderCount } from '@/utils/changeOrderCount';
import { comma } from '@/utils/regExp';

import { OptionDefaultMobileStyled } from './styled';

export interface OptionDefaultMobileProps {
  className?: string;
  selected: Selected[];
  setSelected: Dispatch<SetStateAction<Selected[]>>;
  data: CombinedProductOption;
}

const OptionDefaultMobile = ({
  className,
  selected,
  setSelected,
  data,
}: OptionDefaultMobileProps) => {
  const { changeOrderCount } = orderCount(setSelected);

  return (
    <OptionDefaultMobileStyled className={clsx('OptionDefaultMobile', className)}>
      <ul className="item-inner">
        {selected?.map((v, index) => {
          return (
            <li className="item" key={index}>
              <div className="quantityPay-header">
                <div className="value">{v.value}</div>
              </div>
              <div className="quantityPay-body">
                <Stepper
                  className="quantity"
                  defaultValue={v.orderCnt}
                  onChange={newValue => changeOrderCount(index, newValue)}
                  max={data.multiLevelOptions.find(v => v.optionNo === v.optionNo)?.stockCnt ?? 999}
                />
                <div className="buyPrice">{comma(v.buyPrice * v.orderCnt)} 원</div>
              </div>
            </li>
          );
        })}
      </ul>
    </OptionDefaultMobileStyled>
  );
};

export default OptionDefaultMobile;
