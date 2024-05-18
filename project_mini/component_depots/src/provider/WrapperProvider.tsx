import { ReactNode } from 'react';

import clsx from 'clsx';

import { WrapperStyled } from '@/styles/pageStyled/WrapperStyled';

export default function Wrapper({ children }: { children: ReactNode }) {
  return <WrapperStyled className={clsx('Wrapper')}>{children}</WrapperStyled>;
}
