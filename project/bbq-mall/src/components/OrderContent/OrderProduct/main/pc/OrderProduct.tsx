'use client';

import Image from 'next/image';

import clsx from 'clsx';

import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import OrderContentItem from '@/components/OrderContentTemplate/OrderContentItem';

import { OrderProductStyled } from './styled';

export interface OrderProductProps {
  className?: string;
  products: CartProductData[] | undefined;
}

const OrderProduct = ({ className, products }: OrderProductProps) => {
  return (
    <OrderProductStyled
      label={
        <OrderContentItem label="주문 상품">
          총 <span className="product-title">{products?.length ?? 0}</span> 개
        </OrderContentItem>
      }
      className={clsx('OrderProduct', className)}
    >
      {products?.map((v, i) => {
        const isSingleOption = v.productName === v.optionValue;

        return (
          <div key={v.productNo + i} className="order-product-item">
            <div>
              <Image src={'https:' + v.imageUrl} width={80} height={80} alt="product" unoptimized />
              <div>
                <p>{v.productName}</p>
                <p>{'선택옵션 : ' + (isSingleOption ? '없음' : v.optionValue)}</p>
              </div>
            </div>
            <div>
              <div>{v.orderCnt}개</div>
              <div>
                <p>
                  {(
                    (v.price.salePrice + v.price.addPrice - v.price.immediateDiscountAmt) *
                    v.orderCnt
                  ).toLocaleString()}{' '}
                  원
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </OrderProductStyled>
  );
};

export default OrderProduct;
