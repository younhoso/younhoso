import { BsFilm } from 'react-icons/bs';

import Link from 'next/link';

import { numberToRem } from '~/utils/rem';

import { CategoryInfoContentsStyled } from './styled';

import clsx from 'clsx';
import styled from 'styled-components';

const CreditStyled = styled.div`
  margin-top: 4rem;
  > div {
    max-width: ${numberToRem(900, 1)};
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 0.6rem;
    }

    > div {
      font-size: 1.15rem;
      font-weight: normal;

      &:first-child {
        text-align: right;
        width: 40%;
      }

      &:last-child {
        /* grid-gap: .4rem; */
        display: flex;
        flex-wrap: wrap;
        width: 55%;
        > a {
          /* text-wrap : wrap; */
          /* word-wrap : break-word; */
          word-break: break-all;

          margin-right: 0.5rem;
        }
      }
    }
  }
`;
interface CategoryInfoContentsProps {
  className?: string;
  contents?: any;
  sponser?: any;
  title?: string;
  subtitle?: string;
  filmLink?: string;
}

const CategoryInfoContents = ({
  className,
  contents,
  sponser,
  title,
  subtitle,
  filmLink,
}: CategoryInfoContentsProps) => {
  const contentHtml = contents?.map((x: any, i: number) => (
    <>
      {x?.trim() && (
        <div key={i} className={clsx("postContent", i === 1 && 'en')}>
          <p>
            {x?.trim()?.split('\n').map((line: any, i: number) => {
              return (
                <span key={i}>
                  {line}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
      )}
    </>
  ));

  const sponserHtml = sponser?.map((x: any, i: number) => (
    <div className="sponserContent" key={i}>
      <p>{x.name}</p>
      <div>
        {x.sub.map((y: any, i: number) => (
          <>
            <a href={y.url} target="_blank" rel="noreferrer">
              @{y.name}
            </a>
            &nbsp;
          </>
        ))}
      </div>
    </div>
  ));

  return (
    <CategoryInfoContentsStyled
      className={clsx('CategoryInfoContents', className)}
    >
      <div className="title">
        <p className="titleContent">{title}</p>
        <p className="subTitle">{subtitle}</p>
      </div>

      {filmLink?.trim() && (
        <div className="filmLink">
          <Link href={`/${filmLink?.trim()}`}>
            <p>
              {/* <BsFilm />
              필름 보러가기 */}
              VIEW FILM
            </p>
          </Link>
        </div>
      )}

      {(contents?.[0]?.trim() || contents?.[1]?.trim()) && (
        <div className="content">{contentHtml}</div>
      )}
      <CreditStyled>
        {sponser
          ? sponser.map((x: any, key: number) => {
            return (
              <div key={key}>
                <div>{x.name}</div>
                <div>
                  {x?.sub
                    ? x?.sub.map((subVal: any, subKey: number) => (
                      <a key={subKey} href={subVal.url}>
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

    </CategoryInfoContentsStyled>
  );
};

export default CategoryInfoContents;
