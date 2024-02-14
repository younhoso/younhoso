import clsx from 'clsx';
import { SignPageStyled } from '@/styles/pageStyled/SignPageStyled';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import Signin from '@/components/Signin/Signin';

type Props = {
  searchParams: {
    callbackUrl: string
  }
}

export default async function SignPage({searchParams: {callbackUrl}}: Props) {
  const session = await getServerSession(authOptions);

  if(session){
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

 return (
   <SignPageStyled className={clsx('Sign')}>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'}/>
   </SignPageStyled>
 );
};