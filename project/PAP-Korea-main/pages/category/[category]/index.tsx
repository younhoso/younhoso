import { useMemo } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryBanner from '~/components/atoms/CategoryBanner';
import CategoryList from '~/components/atoms/CategoryList';
import CategoryTitle from '~/components/atoms/CategoryTitle';
import { CategoryStyle } from '~/styles/pageStyles/categoryStyle';

const Category: NextPage = () => {
  const router = useRouter();
  const { category }: any = router.query;

  const {
    data: subDatas,
    isLoading: testL,
    reload: testPatch,
  } = useGet('/post/getSubData', {
    qs: {
      // searchQuery: id && table === 'postCredit' ? { post: id } : {},
      // sort: options,
      category: category,
    },
  });

  const { data: getBanner, isLoading, reload } = useGet('/SubBanner/getData');

  const component = useMemo(() => {
    if (!subDatas || !getBanner) {
      return null;
    }

    const length = subDatas?.length;

    const total = Math.ceil(length / 8);

    return Array(total)
      .fill('')
      .map((x, k) => {
        const bannerKey = k % getBanner.length;

        const slice = subDatas.slice(k * 8, (k + 1) * 8);

        if (k === total - 1) {
          return <CategoryList data={slice} category={category} />;
        }

        return (
          <>
            <CategoryList data={slice} category={category} />
            {getBanner?.[bannerKey] ? (
              <CategoryBanner
                image={getBanner[bannerKey].image.url}
                content={getBanner[bannerKey].content}
              />
            ) : null}
          </>
        );
      });

    return <></>;
  }, [subDatas, getBanner]);

  return (
    <CategoryStyle>
      {
        subDatas?.length ? <>
          <CategoryTitle title={category} />
          {component}
        </> : <div className="comming">
          <p>COMING SOON</p>
        </div>
      }
      {/* <CategoryList data={subDatas} category={category} /> */}
      {/* <CategoryBanner image={bannerImage} content="Banner Image" /> */}
      {/* <CategoryList data={List} category={category} /> */}
      {/* <CategoryBanner image={bannerImage2} content="Banner Image" /> */}
    </CategoryStyle>
  );
};

export default Category;
