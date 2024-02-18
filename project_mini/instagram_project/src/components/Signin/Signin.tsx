'use client';

import clsx from 'clsx';
import { SigninStyled } from '@/components/Signin/styled';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from '../ui/ColorButton';

type Props = {
  providers: Record<string, ClientSafeProvider>
  callbackUrl: string
}

export default function Signin({providers, callbackUrl}: Props) {
 console.log('providers', providers)
 return (
   <SigninStyled className={clsx('Signin')}>
      {Object.values(providers).map(({id, name}) => (
        <ColorButton 
          key={id} 
          text={`Sing In with ${name}`} 
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
   </SigninStyled>
 );
};
