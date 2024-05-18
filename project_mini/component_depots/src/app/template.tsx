'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Wrapper from '@/provider/WrapperProvider';
import { TemplateStyled } from '@/styles/pageStyled/TemplateStyled';

import { defaultSiteMaps } from './sitemap';

export default function CommonTemplate({ children }: { children: ReactNode }) {
  return (
    <TemplateStyled className={clsx('Template')}>
      <Header category={defaultSiteMaps} />
      <div className="content">{children}</div>
      <Footer />
      {/* <button onClick={ () => handle()}>Click my name!</button> */}
    </TemplateStyled>
  );
}
