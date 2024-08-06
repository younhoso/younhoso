import Img from '../Img';
import { CategoryInfoVisualStyled } from './styled';

import clsx from 'clsx';
import styled from 'styled-components';

interface CategoryInfoVisualProps {
  className?: string;
  gradientArray?: any;
  img?: any;
  title?: string;
  subtitle?: string;
  color?: string;
  newsSize?: string;
}

const TitleContentStyled = styled.div<{
  direction: any;
  colors: any;
  color: any;
  title?: any;
}>`
  background: ${props =>
    `linear-gradient(${props.direction}deg, ${props.colors})`};
  color: ${props => props.color};
  padding: ${props => (props.title ? '6rem' : '3rem')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-transform: uppercase;

  & h3 {
    font-size: ${props => (props.title ? '3rem' : '3.5rem')};
    letter-spacing: ${props => (props.title ? '5px' : '10px')};
    font-family: Montserrat;
    /* font-family: Mada; */
    text-align: center;
  }

  & p {
    letter-spacing: 3px;
    font-size: 0.85rem;
  }
`;
const CategoryInfoVisual = ({
  color,
  title,
  subtitle,
  className,
  gradientArray,
  img,
  newsSize,
}: CategoryInfoVisualProps) => {
  const colors = gradientArray ? gradientArray?.[0].join(',') : 'black, black';
  const direction = gradientArray ? gradientArray?.[1] : 0;
  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  return (
    <CategoryInfoVisualStyled className={clsx('CategoryInfoVisual', className)}>
      <img src={img} alt={''} />
      <TitleContentStyled
        direction={direction}
        colors={colors}
        color={color}
        title={title?.match(koreanRegex)}
      >
        <h3 style={newsSize ? { fontSize: newsSize } : {}}>{title}</h3>
        {subtitle?.trim() && <p>{subtitle?.trim()}</p>}
      </TitleContentStyled>
    </CategoryInfoVisualStyled>
  );
};

export default CategoryInfoVisual;
