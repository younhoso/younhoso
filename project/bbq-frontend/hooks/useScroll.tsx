import { useEffect, useState } from 'react';

const useScroll = () => {
  const [y, setY] = useState<number>(0);

  const detectScrollY = () => {
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', detectScrollY);

    return () => {
      window.removeEventListener('scroll', detectScrollY);
    };
  }, [y]);

  useEffect(() => {
    detectScrollY();
  }, []);

  return y;
};

export { useScroll };
