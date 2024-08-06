'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import basket from '@/assets/images/header/basket.svg';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';

import { CartIconStyled } from './styled';

export interface CartIconProps {
  className?: string;
  cartCount: number;
}

const CartIcon = ({ className, cartCount }: CartIconProps) => {
  const router = useRouter();
  const { isSignIn } = useHandleIsSignIn();

  return (
    <CartIconStyled className={clsx('CartIcon', className)}>
      <Image
        src={basket}
        alt="장바구니"
        width={32}
        height={32}
        onClick={() => router.push(`/cart/${isSignIn ? 'user' : 'guest'}`)}
      />
      {!!cartCount && (
        <div className="count-wrapper">
          <div>{cartCount}</div>
        </div>
      )}
    </CartIconStyled>
  );
};

export default CartIcon;
