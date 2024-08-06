import { useEffect, useState } from 'react';
import { BsFilm } from 'react-icons/bs';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import CategoryInfoContents from '~/components/atoms/CategoryInfoContents';
import CategoryInfoList from '~/components/atoms/CategoryInfoList';
import CategoryInfoMoreContent from '~/components/atoms/CategoryInfoMoreContent';
import CategoryInfoVisual from '~/components/atoms/CategoryInfoVisual';
import CategoryModal from '~/components/atoms/CategoryModal';
import { CategoryInfoStyle } from '~/styles/pageStyles/categoryInfoStyle';
import { numberToRem } from '~/utils/rem';

import clsx from 'clsx';
import styled from 'styled-components';

const CreditStyled = styled.div`
  margin-top: 8rem;
  margin-bottom: 25rem;
  > div {
    max-width: ${numberToRem(900, 1)};
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 0.2rem;
    }

    > div {
      &:first-child {
        text-align: right;
        width: 49%;
      }

      &:last-child {
        /* grid-gap: .4rem; */

        display: flex;
        flex-wrap: wrap;
        width: 49%;
        > a {
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

const CategoryInfo: NextPage = () => {
  const [openOnce, setOpenOnce] = useState(true);
  const [openNumber, setOpenNumber] = useState(0);

  const [open, setOpen] = useState(false);
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

  const visualData = postLoading ? [] : postData?.[0];

  const contentData = detailLoading ? [] : detailData;

  const modalToggle = (number: number, openType: boolean) => {
    if (openType) setOpenNumber(number);
    setOpen(!open);
  };

  // useEffect(() => {
  //   const q: any = document?.querySelector("html");
  //   postLoading && detailLoading ? q.style.overflow = "hidden" : q.style.overflow = "auto"
  // }, [postLoading, detailLoading]);

  return (
    <CategoryInfoStyle>
      <CategoryInfoVisual
        img={visualData?.image?.url}
        gradientArray={[
          [visualData?.gradient?.color1, visualData?.gradient?.color2],
          visualData?.gradient?.deg,
        ]}
        color="white"
        title={visualData?.title}
        subtitle={visualData?.subTitle}
      />
      <CategoryInfoList List={contentData} onToggle={modalToggle} />
      <CategoryInfoContents
        contents={[visualData?.contentKR, visualData?.contentEN]}
        filmLink={visualData?.filmLink}
      />

      <CreditStyled className="credit">
        {visualData?.credit
          ? visualData.credit.map((x: any, key: number) => {
              return (
                <div key={key}>
                  <div>{x.name}</div>
                  <div>
                    {x?.sub
                      ? x?.sub.map((subVal: any, subKey: number) => (
                          <a
                            target="_blank"
                            rel="noreferrer"
                            key={subKey}
                            href={subVal.url}
                          >
                            @{subVal.name}
                          </a>
                        ))
                      : null}
                  </div>
                </div>
              );
            })
          : null}
      </CreditStyled>

      <CategoryInfoMoreContent id={id} postData={visualData} />
      <CategoryModal
        setOpenOnce={setOpenOnce}
        openOnce={openOnce}
        openNumber={openNumber}
        open={open}
        data={contentData}
        titleData={visualData}
        onToggle={modalToggle}
      />
      <div className={clsx('blur', postLoading && detailLoading && 'show')}>
        <div className="loadSpin" />
      </div>
    </CategoryInfoStyle>
  );
};

export default CategoryInfo;
