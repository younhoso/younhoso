import { FC } from 'react';

import { Desktop, Mobile } from '@/components/functions';

import { ProductListFilterPopupDesktop } from './desktop';
import { ProductListFilterPopupMobile } from './mobile';

export const ProductListFilterPopup: FC<{}> = () => {
  return (
    <>
      <Desktop>
        <ProductListFilterPopupDesktop />
      </Desktop>
      <Mobile>
        <ProductListFilterPopupMobile />
      </Mobile>
    </>
  );
};
