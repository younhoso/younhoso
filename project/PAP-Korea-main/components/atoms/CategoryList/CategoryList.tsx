import Link from 'next/link';

import Sensor from '~/components/templates/Sensor';
import { numberToRem } from '~/utils/rem';

import Img from '../Img';
import { CategoryListStyled } from './styled';

import clsx from 'clsx';
import moment from 'moment';
import styled from 'styled-components';

interface EditorialSlideProps {
  delay: number;
  titleKorChecking: any;
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
    height: ${numberToRem(550, 1)};
  }
  & p {
    margin-top: 0.7rem;
    font-size: 1rem;
  }

  & .title {
    margin-top: ${props => (props.titleKorChecking ? '.4rem' : '.25rem')};
    font-size: ${props => (props.titleKorChecking ? '2.2rem' : '2.5rem')};
    line-height: ${props => (props.titleKorChecking ? '1.15em' : '.9em')};
  }
`;

interface CategoryListProps {
  className?: string;
  category?: string;
  data: any;
}

const CategoryList = ({ className, category, data }: CategoryListProps) => {
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const ListHtml = data?.map((x: any, i: number) => {
    return (
      <Sensor once key={i}>
        {({ isVisible }) =>
          isVisible ? (
            <Link
              scroll={false}
              href={`/category/${category}/${x.id}${
                x.type == 'news' ? `/news` : ''
              }`}
              passHref
            >
              <EditorialSlide
                titleKorChecking={x.title.match(koreanRegex)}
                delay={(i % 4) * 0.15}
                className={clsx('item')}
              >
                <Img src={x?.imageURL} alt={''} />
                <p className="categoryAndDate">
                  {x.categoryName} - {moment(x.date).format('DD MMM YYYY')}
                </p>
                <h3 className="title">{x.title}</h3>
              </EditorialSlide>
            </Link>
          ) : (
            <div
              style={{
                width: 'calc(100vw / 4 - 3rem)',
                height: numberToRem(600, 1),
              }}
            />
          )
        }
      </Sensor>
    );
  });

  return (
    <CategoryListStyled className={clsx('CategoryList', className)}>
      <div className="list">{ListHtml}</div>
    </CategoryListStyled>
  );
};

export default CategoryList;
