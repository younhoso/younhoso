import Link from 'next/link';

import Sensor from '~/components/templates/Sensor';
import { numberToRem } from '~/utils/rem';

import Img from '../Img';
import { FilmListStyled } from './styled';

import clsx from 'clsx';
import moment from 'moment';
import styled from 'styled-components';

interface EditorialSlideProps {
  delay: number;
  title?: any;
}

const EditorialSlide = styled.div<EditorialSlideProps>`
  cursor: pointer;
  margin: 2rem 1rem;
  width: calc(100vw / 4 - 3rem);
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0;
  animation: showAnimation 0.6s forwards;
  animation-fill-mode: forwards;
  animation-delay: ${props => props.delay}s;

  & .Img {
    height: ${numberToRem(240, 1)};
  }

  & p {
    font-size: 1rem;
  }

  .categoryAndDate {
    margin-top: 0.5rem;
    font-weight: normal;
    font-size: ${numberToRem(14, 1)};
  }

  & .title {
    margin-top: ${props => (props.title ? '.4rem' : '.25rem')};
    font-size: ${props => (props.title ? '2.2rem' : '2.2rem')};
    line-height: ${props => (props.title ? '1.15em' : '.9em')};
  }
`;

interface CategoryListProps {
  className?: string;
  category?: string;
  data: any;
}

const FilmList = ({ className, category, data }: CategoryListProps) => {
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const ListHtml = data?.map((x: any, i: number) => {
    return (
      <Sensor once key={i}>
        {({ isVisible }) =>
          isVisible ? (
            <Link scroll={false} href={`/filmList/${x.id}`} passHref>
              <EditorialSlide
                title={x?.title.match(koreanRegex)}
                delay={(i % 4) * 0.1}
                className={clsx('item')}
              >
                <Img src={x?.image?.url} alt={''} />
                <p className="categoryAndDate">
                  {x.categories?.map((x: any) => x.name).join('&')} -{' '}
                  {moment(x.date).format('DD MMM YYYY')}
                </p>
                <h3 className="title">{x.title}</h3>
              </EditorialSlide>
            </Link>
          ) : (
            <div
              style={{
                width: 'calc(100vw / 4 - 3rem)',
                height: numberToRem(225, 1),
              }}
            ></div>
          )
        }
      </Sensor>
    );
  });

  return (
    <FilmListStyled className={clsx('FilmList', className)}>
      <div className="list">{ListHtml}</div>
    </FilmListStyled>
  );
};

export default FilmList;
