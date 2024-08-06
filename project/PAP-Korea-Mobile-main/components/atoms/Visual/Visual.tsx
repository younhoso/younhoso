import React, { HTMLAttributes, useState, useEffect, useMemo } from 'react';
import Marquee from 'react-fast-marquee';

import Link from 'next/link';

import { useGet } from '~/apis';
import visualBackground from '~/assets/image/Mobille_banner.gif';

import Img from '../Img';
import { VisualStyled } from './styled';

import clsx from 'clsx';

interface VisualProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  theme?: string;
}

const Visual = ({ className, theme, ...VisualProps }: VisualProps) => {
  const [mousePos, setMousePos] = useState([50, 50]);
  const { data: getData, isLoading: isLoading } = useGet('/postVisual/getData');

  const visualData = isLoading ? [] : getData?.data?.[0];
  const categoryData = isLoading ? [] : getData?.category?.[0];

  const mouseMoveEvent = (e: any) => {
    // const mouseX = e.clientX / 150;
    // const mouseY = e.clientY / 150;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setMousePos([mouseX, mouseY]);
  };
  return (
    <VisualStyled {...VisualProps} className={clsx('Visual', className)}>
      <div className="transformImg">
        <Link href={`/category/${categoryData?.name}/${visualData?.post?.id}`}>
          {/* <Img src={visualBackground} alt={''} /> */}
          <img src={visualData?.mobileImage?.url} alt="" />
        </Link>
      </div>
      <div className="contents">
        <h1>{visualData?.post?.subTitle}</h1>
        <p>COEVR STORY &apos;{visualData?.post?.title}&apos;</p>
      </div>
      <Marquee className="backText bt1" loop={0} gradient={false} speed={120}>
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;
      </Marquee>
      <Marquee
        className="backText Top"
        loop={0}
        gradient={false}
        direction="right"
        speed={120}
      >
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;
      </Marquee>
      <Marquee className="backText bt2" loop={0} gradient={false} speed={120}>
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;{visualData?.post?.title}&nbsp;
        {visualData?.post?.title}&nbsp;
      </Marquee>
    </VisualStyled>
  );
};

export default Visual;
