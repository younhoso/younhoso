import { useEffect, useRef, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';

import { useGet } from '~/apis';
import AboutLeftItem from '~/components/atoms/AboutLeftItem';
import AboutTitle from '~/components/atoms/AboutTitle';
import Sensor from '~/components/templates/Sensor';
import { BusinessStyle } from '~/styles/pageStyles/businessStyle';
import { addClass, removeClass } from '~/utils';
import { numberToRem } from '~/utils/rem';

import clsx from 'clsx';

const About: NextPage = () => {
  const ref = useRef();
  const [q1, setQ1] = useState(0);
  const [windowH, setWindowH] = useState(0);
  const { data: getData, isLoading, reload } = useGet(`/about/getData`);

  const aboutData = isLoading ? [] : getData?.[0];

  useEffect(() => {
    addClass('.Footer', 'hidden');
  }, []);

  useEffect(() => {
    const q1: any = document?.querySelector('.ifoverShow1');
    setWindowH(window?.innerHeight);
    setQ1(window?.pageYOffset + q1?.getBoundingClientRect()?.top);
  }, [aboutData]);

  return (
    <BusinessStyle>
      <AboutLeftItem />
      <div className="AboutBody">
        <AboutTitle className="load" title="About" />
        <div className="content about  contentGroup">
          <Sensor once>
            {({ isVisible }) => (
              <div className="contactAni load">
                <pre className={clsx(isVisible ? 'show ' : '')}>
                  {aboutData?.contentEN}
                </pre>
              </div>
            )}
          </Sensor>

          <div style={{ height: numberToRem(100, 1) }} />

          <Sensor once>
            {({ isVisible }) => (
              <div
                className={clsx(
                  'contactAni ifoverShow1',
                  q1 <= windowH ? 'load' : '',
                )}
              >
                <pre className={clsx(isVisible ? 'show' : '')}>
                  {aboutData?.contentKR}
                </pre>
              </div>
            )}
          </Sensor>
          <div style={{ height: numberToRem(512, 1) }} />
          {/* 
          <Sensor once>
            {({ isVisible }) => <>
              {
                isVisible ?
                  <div className="contactAni">

                  </div>

                  : <div style={{ height: numberToRem(200, 1) }}></div>
              }
            </>}
          </Sensor> */}
        </div>
      </div>
    </BusinessStyle>
  );
};

export default About;
