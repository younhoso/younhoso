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
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [windowH, setWindowH] = useState(0);
  const { data: getData, isLoading, reload } = useGet(`/business/getData`);

  const businessData = isLoading ? [] : getData?.[0];

  useEffect(() => {
    addClass('.Footer', 'hidden');
  }, []);

  useEffect(() => {
    const q1: any = document?.querySelector('.ifoverShow1');
    const q2: any = document?.querySelector('.ifoverShow2');
    const q3: any = document?.querySelector('.ifoverShow3');
    const q4: any = document?.querySelector('.ifoverShow4');
    setWindowH(window?.innerHeight);
    setQ1(window?.pageYOffset + q1?.getBoundingClientRect()?.top);
    setQ2(window?.pageYOffset + q2?.getBoundingClientRect()?.top);
    setQ3(window?.pageYOffset + q3?.getBoundingClientRect()?.top);
    setQ4(window?.pageYOffset + q4?.getBoundingClientRect()?.top);
  }, [businessData]);

  const round = 120 / 5;

  return (
    <BusinessStyle>
      <AboutLeftItem />
      <div className="AboutBody">
        <div className="content business">
          <div className="contentGroup">
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
                <div className="contactAni bcontents load">
                  <pre className={clsx(isVisible ? 'show' : '')}>
                    {businessData?.topContentEN}
                  </pre>
                </div>
              )}
            </Sensor>

            <Sensor once>
              {({ isVisible }) => (
                <div
                  className={clsx(
                    'contactAni ifoverShow1',
                    q1 <= windowH ? 'load' : '',
                  )}
                >
                  <pre className={clsx(isVisible ? 'show' : '')}>
                    {businessData?.topContentKR}
                  </pre>
                </div>
              )}
            </Sensor>
            <div className={clsx('contacButtonDiv FROMButton')}>
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
          <div className={clsx('tar', 'contentGroup')}>
            <Sensor once>
              {({ isVisible }) => (
                <>
                  {isVisible ? (
                    <AboutTitle
                      title={businessData?.bottomTitle}
                      className={clsx(
                        'tar ifoverShow2',
                        q2 <= windowH ? 'load' : '',
                      )}
                    />
                  ) : (
                    <div style={{ height: numberToRem(100, 1) }}></div>
                  )}
                </>
              )}
            </Sensor>

            <Sensor once>
              {({ isVisible }) => (
                <div
                  className={clsx(
                    'contactAni  contents ifoverShow3',
                    q3 <= windowH ? 'load' : '',
                  )}
                >
                  <pre className={clsx(isVisible ? 'show' : '')}>
                    {businessData?.bottomContentEN}
                  </pre>
                </div>
              )}
            </Sensor>
            <br />
            <br />
            <br />

            <Sensor once>
              {({ isVisible }) => (
                <div
                  className={clsx(
                    'contactAni ifoverShow4',
                    q4 <= windowH ? 'load' : '',
                  )}
                >
                  <pre className={clsx(isVisible ? 'show' : '')}>
                    {businessData?.bottomContentKR}
                  </pre>
                </div>
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
