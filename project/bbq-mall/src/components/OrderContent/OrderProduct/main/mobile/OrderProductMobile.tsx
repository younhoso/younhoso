'use client';

import Image from 'next/image';

import clsx from 'clsx';

import { OrderProductProps } from '../pc/OrderProduct';
import { OrderProductMobileStyled } from './styled';

const OrderProductMobile = ({ className, products }: OrderProductProps) => {
  return (
    <OrderProductMobileStyled
      title={
        <div className="order-product-header">
          <div>주문 상품</div>

          <div>
            총 <span>{products?.length ?? 0}</span> 개
          </div>
        </div>
      }
      className={clsx('OrderProductMobile', className)}
    >
      {products?.map((v, i) => {
        const isSingleOption = v.productName === v.optionValue;

        return (
          <div key={v.productNo + i} className="order-product-item">
            <Image src={'https:' + v.imageUrl} width={80} height={80} alt="product" unoptimized />
            <div>
              <p className="product-name">{v.productName}</p>
              <p className="option-name">
                {'선택옵션 : ' + (isSingleOption ? '없음' : v.optionValue)}
              </p>
              <div>
                {(
                  (v.price.salePrice + v.price.addPrice - v.price.immediateDiscountAmt) *
                  v.orderCnt
                ).toLocaleString()}{' '}
                원{' '}
                <span>
                  <span> | </span>
                  {v.orderCnt}개
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </OrderProductMobileStyled>
  );
};

export default OrderProductMobile;
