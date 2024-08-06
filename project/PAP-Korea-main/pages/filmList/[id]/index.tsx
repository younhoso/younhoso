import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import { numberToRem } from '~/utils/rem';

import FilmStyled from './styled';

import styled from 'styled-components';
import clsx from 'clsx';

const CreditStyled = styled.div`
  /* margin-top: 4rem; */
  margin-bottom: 15rem;
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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data: filmData, isLoading: filmLoading } = useGet(
    '/filmSlide/getData',
    {
      qs: {
        searchQuery: {
          id: id,
        },
      },
    },
  );

  const filmViewData = filmLoading ? [] : filmData?.[0];

  const modalToggle = () => {
    setOpen(!open);
  };

  const contentHtml = [filmViewData?.contentKR, filmViewData?.contentEN].filter(x => x).map((x: any, i: number) => {
    return x?.trim() != '' ? (
      <div className={clsx("content", "wrap", "postContent", i === 1 && "en")} key={i}>
        <p>
          {x?.split("\n").map((v: any, kk: number) => (kk + 1) === x?.split("\n").length ? <>{v}</> : <>{v}<br /></>)}
        </p>
      </div>
    ) : null
  },
  );


  return (
    <FilmStyled>
      <div className="headerBG" />
      <div className="emptyTop"></div>
      <div className="wrap title">
        <h2>{filmViewData?.title}</h2>
        {filmViewData?.subTitle?.trim() && <p>{filmViewData?.subTitle}</p>}
      </div>

      <div className="video wrap">
        <ReactPlayer
          url={filmViewData?.videoLink}
          className="react-player"
          // playing={true}
          // muted={true}
          width="100%"
          height="100%"
          controls={true}
        />
      </div>
      {/* 
      {!['', '-'].some((x: any) => x === filmViewData?.content?.trim()) && (
        <div className="content wrap">
          <pre>{filmViewData?.content}</pre>
        </div>
      )} */}

      {contentHtml}

      <CreditStyled>
        {filmViewData?.credit
          ? filmViewData.credit.map((x: any, key: number) => {
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
    </FilmStyled>
  );
};

export default CategoryInfo;
