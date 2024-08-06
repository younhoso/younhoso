'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import close from '@/assets/images/components/close.svg';
import Checkbox from '@/components/Checkbox';
import Stepper from '@/components/Stepper';

import { CartProductData } from '../pc/CartProduct';
import { CartProductMobileStyled } from './styled';

export interface CartProductMobileProps {
  className?: string;
  data: CartProductData;
  checked: boolean;
  onChangeCheckbox: () => void;
  onClickDelete: () => void;
  onChangeCartCount: (e: number) => void;
}

const CartProductMobile = ({
  className,
  data,
  checked,
  onChangeCheckbox,
  onClickDelete,
  onChangeCartCount,
}: CartProductMobileProps) => {
  const router = useRouter();

  return (
    <CartProductMobileStyled className={clsx('CartProductMobile', className)}>
      <Checkbox checked={checked} onChange={onChangeCheckbox} disabled={!data.validInfo.valid} />
      <div className="cart-product-mobile-content">
        <div className="cart-product-mobile-title">
          <div onClick={() => router.push('/categories/detail/' + data.productNo)}>
            {data.productName}
          </div>
          <Image src={close} width={20} height={20} alt="delete-cart" onClick={onClickDelete} />
        </div>

        <div className={clsx('cart-product-mobile-info', !data.validInfo.valid && 'sold-out')}>
          <picture>
            <Image
              src={'https:' + data.imageUrl}
              fill
              sizes="100%"
              alt={`${data.productName}${data.cartNo}_cart`}
            />
          </picture>
          {!!data.validInfo.valid && (
            <div className="cart-product-mobile-price">
              <div className="cart-product-mobile-price-info">
                <p>
                  {(
                    (data.price.salePrice - data.price.immediateDiscountAmt + data.price.addPrice) *
                    data.orderCnt
                  ).toLocaleString()}{' '}
                  원
                </p>
                {!!data.price.immediateDiscountAmt && (
                  <p>
                    {(
                      (data.price.salePrice + data.price.addPrice) *
                      data.orderCnt
                    ).toLocaleString()}{' '}
                    원
                  </p>
                )}
              </div>
              <Stepper
                defaultValue={data.orderCnt}
                onChange={onChangeCartCount}
                max={data.stockCnt}
              />
            </div>
          )}
        </div>
      </div>
    </CartProductMobileStyled>
  );
};

export default CartProductMobile;
