'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import basket from '@/assets/images/header/basket.svg';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';

import { CartIconProps } from '../pc/CartIcon';
import { CartIconMobileStyled } from './styled';

const CartIconMobile = ({ className, cartCount }: CartIconProps) => {
  const router = useRouter();
  const { isSignIn } = useHandleIsSignIn();

  return (
    <CartIconMobileStyled className={clsx('CartIconMobile', className)}>
      <Image
        src={basket}
        alt="장바구니"
        width={26}
        height={26}
        onClick={() => router.push(`/cart/${isSignIn ? 'user' : 'guest'}`)}
      />
      {!!cartCount && (
        <div className="count-wrapper">
          <div>{cartCount}</div>
        </div>
      )}
    </CartIconMobileStyled>
  );
};

export default CartIconMobile;
