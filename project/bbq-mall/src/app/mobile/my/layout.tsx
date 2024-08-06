'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { findLast } from 'lodash';

import Divider from '@/components/Divider';
import Header from '@/components/Header';
import { MyItemChildren, myItemList } from '@/components/MyCategory/main/pc/MyCategory';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';

const MyLayout = ({ children }: { children: ReactNode }) => {
  const { isSignIn } = useHandleIsSignIn();

  const router = useRouter();
  const replacedPathname = useGetReplacedPathname();

  useEffect(() => {
    if (!isSignIn && replacedPathname === '/my') {
      router.push('/my/sign');
    } else if (isSignIn && replacedPathname === '/my/sign') {
      router.push('/my');
    }
  }, [isSignIn, replacedPathname]);

  const flatMapped = myItemList.flatMap(v => v.children);

  const pathItem =
    findLast(flatMapped, v => replacedPathname.startsWith(v.linkTo)) ??
    ({
      label: '마이페이지',
      linkTo: '/my',
      hasBack: false,
    } as MyItemChildren);

  return (
    <>
      <Header.Mobile
        title={pathItem.label}
        hasBack={pathItem.hasBack}
        onClickBack={() => router.push(pathItem.backRoute ? pathItem.backRoute : '/mobile/my/info')}
      />
      <Divider.Mobile />
      {children}
    </>
  );
};

export default MyLayout;
