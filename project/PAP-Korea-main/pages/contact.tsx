import { useEffect } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';

import { useGet } from '~/apis';
import AboutLeftItem from '~/components/atoms/AboutLeftItem';
import AboutTitle from '~/components/atoms/AboutTitle';
import Sensor from '~/components/templates/Sensor';
import { BusinessStyle } from '~/styles/pageStyles/businessStyle';
import { addClass } from '~/utils';

import clsx from 'clsx';

const Contactus: NextPage = () => {
  const { data: getData, isLoading, reload } = useGet(`/contactus/getData`);

  const contactData = isLoading ? [] : getData?.[0];

  useEffect(() => {
    addClass('.Footer', 'hidden');
  }, []);

  return (
    <BusinessStyle>
      <AboutLeftItem />
      <div className="AboutBody">
        <AboutTitle className="load" title="Contact US" />

        <Sensor once>
          {({ isVisible }) => (
            <div className="contactAni load">
              <div className={clsx('content contact', isVisible ? 'show' : '')}>
                <div>
                  <pre>{contactData?.contentEN}</pre>
                  <br />
                  <pre>{contactData?.contentKR}</pre>
                </div>
                <div>
                  {contactData?.contacts?.map((x: any, i: number) => (
                    <div key={i}>
                      <p>{x?.title}</p>
                      <p className="Mail">
                        <Link scroll={false} href={x?.link}>
                          {x?.email}
                        </Link>
                      </p>
                      <br />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Sensor>
      </div>
    </BusinessStyle>
  );
};

export default Contactus;
