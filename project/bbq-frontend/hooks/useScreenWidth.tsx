import { useEffect, useState } from 'react';

const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(0);

  const detectSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [width]);

  useEffect(() => {
    detectSize();
  }, []);

  return width;
};

export { useScreenWidth };
