import { useEffect } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';

import { useGet } from '~/apis';
import AboutLeftItem from '~/components/atoms/AboutLeftItem';
import AboutTitle from '~/components/atoms/AboutTitle';
import { BusinessStyle } from '~/styles/pageStyles/businessStyle';
import { addClass } from '~/utils';

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
        <div className="content contact contactAni load">
          <div>
            <pre>{contactData?.contentEN}</pre>
            <br />
            <pre>{contactData?.contentKR}</pre>
          </div>
          <div>
            {!contactData
              ? []
              : contactData?.contacts?.map((x: any, i: number) => (
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
    </BusinessStyle>
  );
};

export default Contactus;
