import { newsSlideProps, heightObjRems } from '~/components/props';
import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const ImageStyled = styled.div<newsSlideProps>`
  height: ${props => heightObjRems[props.heightSize]};
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
