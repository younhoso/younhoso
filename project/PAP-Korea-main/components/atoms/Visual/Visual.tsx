import React, { HTMLAttributes, useState, useEffect, useMemo } from 'react';
import AnimatedText from 'react-animated-text-content';
import { connect } from 'react-redux';

import { useGet } from '~/apis';
import Symbol from '~/assets/icon/Symbol.svg';
import logo from '~/assets/icon/logo.svg';
import visualBackground from '~/assets/image/banner_pc.jpg';
import Sensor from '~/components/templates/Sensor';
import SlideImages from '~/components/templates/SlideImages';
import { numberToRem } from '~/utils/rem';

import Svg from '../Svg';
import { VisualStyled } from './styled';

import clsx from 'clsx';

interface VisualProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  theme?: string;
  state: any;
}

function headerTest(state: any) {
  return {
    state: state,
  };
}

const Visual = ({ className, theme, state, ...VisualProps }: VisualProps) => {
  const { data: getData, isLoading: isLoading } = useGet('/postVisual/getData');

  const visualData = isLoading ? [] : getData?.data?.[0];
  const categoryData = isLoading ? [] : getData?.category?.[0];
  const [mousePos, setMousePos] = useState([700, 400]);
  const [mousePos1, setMousePos1] = useState([700, 400]);
  const [mousePos2, setMousePos2] = useState([700, 400]);
  const [scrollY, setScrollY] = useState(0);

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

  const mouseMoveEvent = (e: any) => {
    // const mouseX = e.clientX / 150;
    // const mouseY = e.clientY / 150;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setTimeout(() => {
      setMousePos([mouseX, mouseY]);
      setTimeout(() => {
        setMousePos1([mouseX, mouseY]);
        setTimeout(() => {
          setMousePos2([mouseX, mouseY]);
        }, 30);
      }, 30);
    }, 70);
  };

  return (
    <VisualStyled
      {...VisualProps}
      className={clsx('Visual', className)}
      onMouseMove={mouseMoveEvent}
    >
      <div
        className={clsx(
          'VisualLogo',
          scrollY > 500 && 'goHeader',
          scrollY > 500 && state.header && 'hidden',
        )}
        // onClick
        style={{
          left: `${mousePos[0]}px`,
          top: `${mousePos[1] > 180 ? mousePos[1] : 180}px`,
        }}
      >
        <Svg
          icon={logo}
          color="white"
          width={numberToRem(scrollY > 500 ? 120 : 400, 1)}
          height={numberToRem(scrollY > 500 ? 90 : 240, 1)}
        />
      </div>
      <div className="background">
        <SlideImages heightSize="full" src={visualData?.pcImage?.url} />
      </div>

      <div
        className={clsx(
          'VisualLogo',
          scrollY > 500 && 'goHeader',
          scrollY > 500 && state.header && 'hidden',
        )}
        style={{
          left: `${mousePos1[0]}px`,
          top: `${mousePos1[1] > 180 ? mousePos1[1] : 180}px`,
          opacity: 0.5,
        }}
      >
        <Svg
          icon={logo}
          color="white"
          width={numberToRem(scrollY > 500 ? 120 : 400, 1)}
          height={numberToRem(scrollY > 500 ? 90 : 240, 1)}
        />
      </div>
      <div
        className={clsx(
          'VisualLogo',
          scrollY > 500 && 'goHeader',
          scrollY > 500 && state.header && 'hidden',
        )}
        style={{
          left: `${mousePos2[0]}px`,
          top: `${mousePos2[1] > 180 ? mousePos2[1] : 180}px`,
          opacity: 0.5,
        }}
      >
        <Svg
          icon={logo}
          color="white"
          width={numberToRem(scrollY > 500 ? 120 : 400, 1)}
          height={numberToRem(scrollY > 500 ? 90 : 240, 1)}
        />
      </div>
      <Sensor once>
        {({ isVisible }) => (
          <div className="test">
            <div className="left">
              {isVisible ? (
                <div className="leftShowEvent">
                  <p>{visualData?.post?.subTitle}</p>
                  <h2>{visualData?.post?.title}</h2>
                </div>
              ) : (
                <div style={{ width: '10px', height: '1px' }}></div>
              )}
            </div>

            <div className="right">
              {isVisible ? (
                <div className="rightShowEvent">
                  <Svg
                    icon={Symbol}
                    height="4rem"
                    width="4rem"
                    color=" white"
                  />
                  {/* <pre>{visualData?.credit}</pre> */}
                </div>
              ) : (
                <div style={{ width: '10px', height: '1px' }}></div>
              )}
            </div>
          </div>
        )}
      </Sensor>
    </VisualStyled>
  );
};

export default connect(headerTest)(Visual);
