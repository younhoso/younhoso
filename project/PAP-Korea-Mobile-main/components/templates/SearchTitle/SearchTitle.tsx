import { useEffect, useMemo, useRef, useState } from 'react';

import { numberToRem } from '~/utils/rem';

import { SearchTitleStyled } from './styled';

import clsx from 'clsx';
import { useRouter } from 'next/router';

interface CategoryTitleProps {
  className?: string;
  title?: string;
  categoryData?: any;
}

function useInterval(callback: Function, delay: any) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback?.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const CategoryTitle = ({
  className,
  title,
  categoryData,
}: CategoryTitleProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [move, setMove] = useState<number>(50);

  const router = useRouter();
  // const Path = useMemo(() => router.asPath, [router])
  // console.log(Path);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useInterval(() => {
    if (move <= 39.49 == true) setMove(50);
    else if (move >= 70.99) setMove(50);
    else setMove(move - (scrollY != 0 ? -0.01 : 0.01));
  }, 10);

  return (
    <>
      <div></div>
    </>
  );
};

export default CategoryTitle;
