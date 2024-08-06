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
}

const EditorialSlide = styled.div<EditorialSlideProps>`
  cursor: pointer;
  margin: 1rem 1rem;
  width: calc(100vw - 3rem);
  text-transform: uppercase;
  font-weight: bold;

  opacity: 0;

  animation: showAnimation 0.6s forwards;
  animation-fill-mode: forwards;

  animation-delay: ${props => props.delay}s;
  & p {
    font-size: 1rem;
    margin-top: 0.5rem;
    font-weight: 500;
  }

  & .title {
    font-size: 1.8rem;
  }
`;

interface FilmListProps {
  className?: string;
  category?: string;
  data: any;
}

const FilmList = ({ className, category, data }: FilmListProps) => {
  const ListHtml = data?.map((x: any, i: number) => {
    return (
      <Sensor once key={i}>
        {({ isVisible }) =>
          isVisible ? (
            <Link
              scroll={false}
              href={`/filmList/${x.id}`}
              passHref
            >
              <EditorialSlide delay={0} className={clsx('item')}>
                <Img src={x?.image?.url} alt={''} />
                <p>
                  {x.categories?.map((x: any) => x.name).join('&')} -{' '}
                  {moment(x.date).format('DD MMM YYYY')}
                </p>
                <h3 className="title">{x.title}</h3>
              </EditorialSlide>
            </Link>
          ) : (
            <div
              style={{
                marginTop: '10rem',
                width: 'calc(100vw - 3rem)',
                height: numberToRem(100, 1),
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
