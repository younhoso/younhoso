import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';

import { useGet } from '~/apis';
import AboutLeftItem from '~/components/atoms/AboutLeftItem';
import AboutTitle from '~/components/atoms/AboutTitle';
import Sensor from '~/components/templates/Sensor';
import { BusinessStyle } from '~/styles/pageStyles/businessStyle';
import { addClass, removeClass } from '~/utils';
import { numberToRem } from '~/utils/rem';

const About: NextPage = () => {
  const { data: getData, isLoading, reload } = useGet(`/about/getData`);

  const aboutData = isLoading ? [] : getData?.[0];

  useEffect(() => {
    addClass('.Footer', 'hidden');
  }, []);

  return (
    <BusinessStyle>
      <AboutLeftItem />
      <div className="AboutBody">
        <AboutTitle className="load" title="About" />
        <div className="content about">
          <Sensor once>
            {({ isVisible }) => (
              <>
                {isVisible ? (
                  <div className="contactAni load">
                    <pre>{aboutData?.contentEN}</pre>
                  </div>
                ) : (
                  <div style={{ height: numberToRem(100, 1) }}></div>
                )}
              </>
            )}
          </Sensor>

          <div style={{ height: numberToRem(175, 1) }} />

          <Sensor once>
            {({ isVisible }) => (
              <>
                {isVisible ? (
                  <div className="contactAni load">
                    <pre>{aboutData?.contentKR}</pre>
                  </div>
                ) : (
                  <div style={{ height: numberToRem(400, 1) }}></div>
                )}
              </>
            )}
          </Sensor>
          <div style={{ height: numberToRem(200, 1) }} />
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
