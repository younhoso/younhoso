import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import { randomNum } from '~/utils';
import { numberToRem } from '~/utils/rem';

import Img from '../Img';
import Svg from '../Svg';
import { LoadingPageStyled } from './styled';

import clsx from 'clsx';

interface LoadingPageProps {
  className?: string;
}

const LoadingPage = ({ className }: LoadingPageProps) => {
  const { data: getData, isLoading, reload } = useGet('/loadImage/getData');
  const router = useRouter();
  const [Rand, setRand] = useState(0);
  // const logoX = `${bgList[Rand]?.logoPosition[0]}%`;
  // const logoY = `${bgList[Rand]?.logoPosition[1]}%`;
  // const logoTransform = bgList[Rand]?.logoTransform
  //   ? bgList[Rand]?.logoTransform
  //   : '';

  const bgListHtml = getData?.map((x: any, i: number) => {
    return (
      <div className={Rand == i ? 'item show' : 'item'} key={i}>
        <img src={x?.image?.[0]?.url} alt={''} />
      </div>
    );
  });

  useEffect(() => {
    setRand(randomNum(1, getData?.length) - 1);
  }, [router.asPath]);

  return (
    <LoadingPageStyled className={clsx('LoadingPage', className)}>
      {!isLoading && bgListHtml}
      {/* <div
            className="svg"
            style={{
              left: logoX,
              top: logoY,
              transform: logoTransform,
            }}
          >
            <Svg
          icon={logo}
          color={bgList[Rand].logoColor}
          width={numberToRem(400, 1.5)}
          height={numberToRem(240, 1.5)}
        />
          </div> */}
    </LoadingPageStyled>
  );
};

export default LoadingPage;
