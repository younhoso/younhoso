import styled from 'styled-components';


import { newsSlideProps, heightObjProps } from "~/components/props";
import { numberToRem } from '~/utils/rem';

const heightObj: heightObjProps = {
  newsSlide: numberToRem(336, 1),
  default: "auto",
  ediLarge: numberToRem(820, 1),
  ediNormal: numberToRem(480, 1),
  full: "100%",
}

export const ImageStyled = styled.div<newsSlideProps>`
  height : ${props => heightObj[props.heightSize]};
  img {
    object-fit: cover;
    width : 100%;
    height: 100%;
  }
  
`
