'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { Category } from '@/app/sitemap';
import Wrapper from '@/provider/WrapperProvider';

import { HeaderStyled } from './styled';

interface HeaderProps {
  category: Category[];
}

export default function Header({ category }: HeaderProps) {
  const pathname = usePathname();

  return (
    <HeaderStyled className={clsx('Header', { mainHeader: pathname === '/' })}>
      <Wrapper>
        <div className="inner">
          <Link href={'/'}></Link>
          <ul className="category-inner">
            {category.map(v => {
              return (
                <div key={v.title}>
                  <Link href={v.pageUrl}>{v.title}</Link>
                </div>
              );
            })}
          </ul>
        </div>
      </Wrapper>
    </HeaderStyled>
  );
}
