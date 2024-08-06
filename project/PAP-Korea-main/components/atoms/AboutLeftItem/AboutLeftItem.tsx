import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AboutLeftItemStyled } from './styled';

import clsx from 'clsx';

interface AboutLeftItemProps {
  className?: string;
}

const AboutLeftItem = ({ className }: AboutLeftItemProps) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const ChangeOpen = () => setOpen(!open);

  return (
    <AboutLeftItemStyled className={clsx('AboutLeftItem', className)}>
      <div
        className={clsx('more', open && 'open')}
        onClick={() => ChangeOpen()}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={clsx('businessMenus', open && 'open')}>
        <p className={clsx(router.asPath == '/business' && 'active')}>
          <Link scroll={false} href={'/business'}>
            business
          </Link>
        </p>
        <p className={clsx(router.asPath == '/contact' && 'active')}>
          <Link scroll={false} href={'/contact'}>
            contact
          </Link>
        </p>
        <p className={clsx(router.asPath == '/about' && 'active')}>
          <Link scroll={false} href={'/about'}>
            about
          </Link>
        </p>
      </div>
    </AboutLeftItemStyled>
  );
};

export default AboutLeftItem;
