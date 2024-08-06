import { useEffect, useRef, useState } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import { CategoryInfoContentsStyled } from '~/components/atoms/CategoryInfoContents/styled';
import CategoryInfoVisual from '~/components/atoms/CategoryInfoVisual';
import { CategoryInfoStyle } from '~/styles/pageStyles/categoryInfoStyle';
import WysiwygViewer from '~/utils/viewer/WysiwygViewer';

import clsx from 'clsx';

const CategoryInfo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: getData, isLoading } = useGet('/newspaper/getData', {
    qs: {
      searchQuery: {
        id: id,
      },
    },
  });

  const [activeNum, setActiveNum] = useState(0);
  const newsData = isLoading ? [] : getData?.[0];
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <CategoryInfoStyle>
      <CategoryInfoVisual
        // ref={visualRef}
        data={[]}
        activeNum={activeNum}
        setActiveNum={setActiveNum}
        mainData={newsData}
      />
      <div
        className="empty"
        style={{
          background: 'transparent',
          height: '60rem',
        }}
      />

      {/* <CategoryInfoList List={List.items} onToggle={modalToggle} /> */}
      {!isLoading && getData && (
        <>
          <CategoryInfoContentsStyled
            className={clsx(
              'CategoryInfoContents',
              newsData?.title.match(koreanRegex) && 'korTitle',
            )}
          >
            {/* <div className="title newsTitle"> */}
            <div className="title">
              <p
                className="titleContent"
                style={{
                  fontSize: '2.5rem',
                  lineHeight: '36px',
                  marginBottom: '2rem',
                }}
              >
                {newsData?.title}
              </p>
              {/* {newsData?.subTitle?.trim() && (
                <p className='subTitle'>{newsData?.subTitle?.trim()}</p>
              )} */}
            </div>
            <WysiwygViewer initialValue={newsData?.content} />
          </CategoryInfoContentsStyled>
        </>
      )}
      {/* <CategoryInfoContents newsData={newsData} /> */}

      {/* <CategoryModal open={open} data={List.items} onToggle={modalToggle} /> */}
      <div className={clsx('blur', isLoading && 'show')}>
        <div className="loadSpin" />
      </div>
    </CategoryInfoStyle>
  );
};

export default CategoryInfo;
