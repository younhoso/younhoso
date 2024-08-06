'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import close from '@/assets/images/components/close.svg';
import Checkbox from '@/components/Checkbox';
import Stepper from '@/components/Stepper';
import { CartProductP } from '@/types';

import { CartProductStyled } from './styled';

export type CartProductData = CartProductP & { value: CartProductP['cartNo']; productName: string };

export interface CartProductProps {
  className?: string;
  data: CartProductData;
  checked: boolean;
  onChangeCheckbox: () => void;
  onClickDelete: () => void;
  onChangeCartCount: (e: number) => void;
}

const CartProduct = ({
  className,
  data,
  checked,
  onChangeCheckbox,
  onClickDelete,
  onChangeCartCount,
}: CartProductProps) => {
  const isSingleOption = data.productName === data.optionValue;
  const router = useRouter();

  return (
    <CartProductStyled className={clsx('CartProduct', className)}>
      <div>
        <Checkbox checked={checked} onChange={onChangeCheckbox} disabled={!data.validInfo.valid} />
        <picture className={clsx(!data.validInfo.valid && 'sold-out')}>
          <Image
            className="thumb-image"
            width={80}
            height={80}
            alt={`${data.optionValue}_image`}
            src={'https:' + data.imageUrl}
          />
        </picture>
        <div
          className={clsx('cart-product-title', !data.validInfo.valid && 'sold-out')}
          onClick={() => router.push('/categories/detail/' + data.productNo)}
        >
          <p>{data.productName}</p>
          <p>{'선택옵션 : ' + (isSingleOption ? '없음' : data.optionValue)}</p>
        </div>
      </div>

      <div>
        {!!data.validInfo.valid && (
          <div className="cart-product-price-wrapper">
            <Stepper
              defaultValue={data.orderCnt}
              onChange={onChangeCartCount}
              max={data.stockCnt}
            />

            <div className="cart-product-price">
              <p>
                {(
                  (data.price.salePrice - data.price.immediateDiscountAmt + data.price.addPrice) *
                  data.orderCnt
                ).toLocaleString()}{' '}
                원
              </p>
              {!!data.price.immediateDiscountAmt && (
                <p>
                  {((data.price.salePrice + data.price.addPrice) * data.orderCnt).toLocaleString()}{' '}
                  원
                </p>
              )}
            </div>
          </div>
        )}
        <Image
          src={close}
          width={24}
          height={24}
          alt="delete-cart"
          className="delete-cart-icon"
          onClick={onClickDelete}
        />
      </div>
    </CartProductStyled>
  );
};

export default CartProduct;
