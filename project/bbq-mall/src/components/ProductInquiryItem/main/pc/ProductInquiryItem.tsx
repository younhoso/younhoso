'use client';

import clsx from 'clsx';

import { ProductInquiryItemStyled } from './styled';

export interface ProductInquiryItemProps {
  className?: string;
}

const ProductInquiryItem = ({ className }: ProductInquiryItemProps) => {
  return (
    <ProductInquiryItemStyled
      className={clsx('ProductInquiryItem', className)}
    ></ProductInquiryItemStyled>
  );
};

export default ProductInquiryItem;
