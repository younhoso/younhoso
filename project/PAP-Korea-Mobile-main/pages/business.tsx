import { useEffect, useState } from 'react';

import type { NextPage } from 'next';

import { useGet } from '~/apis';
import AboutLeftItem from '~/components/atoms/AboutLeftItem';
import AboutTitle from '~/components/atoms/AboutTitle';
import Sensor from '~/components/templates/Sensor';
import { BusinessStyle } from '~/styles/pageStyles/businessStyle';
import { addClass, removeClass } from '~/utils';
import { numberToRem } from '~/utils/rem';

import clsx from 'clsx';

const Business: NextPage = () => {
  const [scroll, setScroll] = useState(0);
  const { data: getData, isLoading, reload } = useGet(`/business/getData`);

  const businessData = isLoading ? [] : getData?.[0];

  useEffect(() => {
    addClass('.Footer', 'hidden');
  }, []);

  const round = 120 / 5;

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BusinessStyle>
      <AboutLeftItem />
      <div className="AboutBody">
        <div className="content business">
          <div>
            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <AboutTitle
                      className="load"
                      title={businessData?.topTitle}
                    />
                  ) : (
                    <div style={{ height: numberToRem(584, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>

            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <div className="contactAni load">
                      <pre>{businessData?.topContentEN}</pre>
                    </div>
                  ) : (
                    <div style={{ height: numberToRem(100, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>

            <br />
            <br />
            <br />

            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <div className="contactAni load">
                      <pre>{businessData?.topContentKR}</pre>
                    </div>
                  ) : (
                    <div style={{ height: numberToRem(100, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>
            <div className={clsx('contacButtonDiv')}>
              <div className={clsx('contactButton')}>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 0}deg)`,
                  }}
                >
                  p
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 1}deg)`,
                  }}
                >
                  r
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 2}deg)`,
                  }}
                >
                  o
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 3}deg)`,
                  }}
                >
                  m
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 4}deg)`,
                  }}
                >
                  o
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 5}deg)`,
                  }}
                >
                  t
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 6}deg)`,
                  }}
                >
                  e
                </p>
              </div>
            </div>
          </div>
          <div className={clsx('tar')}>
            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <AboutTitle
                      title={businessData?.bottomTitle}
                      className={clsx('tar', 'load')}
                    />
                  ) : (
                    <div style={{ height: numberToRem(474, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>

            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <div className="contactAni load">
                      <pre>{businessData?.bottomContentEN}</pre>
                    </div>
                  ) : (
                    <div style={{ height: numberToRem(100, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>

            <br />
            <br />
            <br />
            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <div className="contactAni load">
                      <pre>{businessData?.bottomContentKR}</pre>
                    </div>
                  ) : (
                    <div style={{ height: numberToRem(100, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>
            <div className={clsx('contacButtonDiv', 'down')}>
              <div className={clsx('contactButton')}>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 0}deg)`,
                  }}
                >
                  c
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 1}deg)`,
                  }}
                >
                  o
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 2}deg)`,
                  }}
                >
                  n
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 3}deg)`,
                  }}
                >
                  t
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 4}deg)`,
                  }}
                >
                  a
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 5}deg)`,
                  }}
                >
                  c
                </p>
                <p
                  style={{
                    transform: `translate(-50%, -50%) rotate(${round * 6}deg)`,
                  }}
                >
                  t
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BusinessStyle>
  );
};

export default Business;
