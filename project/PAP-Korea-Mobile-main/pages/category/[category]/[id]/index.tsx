import { useEffect, useRef, useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryInfoContents from '~/components/atoms/CategoryInfoContents';
import CategoryInfoMoreContent from '~/components/atoms/CategoryInfoMoreContent';
import CategoryInfoVisual from '~/components/atoms/CategoryInfoVisual';
import { CategoryInfoStyle } from '~/styles/pageStyles/categoryInfoStyle';

import clsx from 'clsx';

const CategoryInfo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: postData, isLoading: postLoading } = useGet('/post/getData', {
    qs: {
      searchQuery: {
        id: id,
      },
    },
  });
  const { data: detailData, isLoading: detailLoading } = useGet(
    '/postCredit/getData',
    {
      qs: {
        searchQuery: {
          post: id,
        },
        sort: {
          id: 'ASC',
        },
      },
    },
  );
  const [activeNum, setActiveNum] = useState(0);

  const visualData = postLoading ? [] : postData?.[0];
  const contentData = detailLoading ? [] : detailData;

  const visualRef = useRef<any>(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <CategoryInfoStyle>
      <CategoryInfoVisual
        // ref={visualRef}
        data={contentData}
        activeNum={activeNum}
        setActiveNum={setActiveNum}
        mainData={visualData}
      />
      <div
        className="empty"
        style={{
          background: 'transparent',
          height: '60rem',
        }}
      ></div>
      {/* <CategoryInfoList List={List.items} onToggle={modalToggle} /> */}
      <CategoryInfoContents
        title={visualData?.title}
        subtitle={visualData?.subTitle}
        contents={[visualData?.contentKR, visualData?.contentEN]}
        sponser={visualData?.credit}
        filmLink={visualData?.filmLink}
      />

      <CategoryInfoMoreContent id={id} postData={visualData} />

      {/* <CategoryModal open={open} data={List.items} onToggle={modalToggle} /> */}
      <div className={clsx('blur', postLoading && detailLoading && 'show')}>
        <div className="loadSpin" />
      </div>
    </CategoryInfoStyle>
  );
};

export default CategoryInfo;
