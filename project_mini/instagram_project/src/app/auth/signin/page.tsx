import clsx from 'clsx';
import { SignPageStyled } from '@/styles/pageStyled/SignPageStyled';
import { getProviders } from 'next-auth/react';
import Signin from '@/components/Signin/Signin';

type Props = {
  searchParams: {
    callbackUrl: string
  }
}

export default async function SignPage({searchParams: {callbackUrl}}: Props) {
  const providers = (await getProviders()) ?? {};

 return (
   <SignPageStyled className={clsx('Sign')}>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'}/>
   </SignPageStyled>
 );
};