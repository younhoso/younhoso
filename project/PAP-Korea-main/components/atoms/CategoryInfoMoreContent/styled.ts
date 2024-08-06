import styled from 'styled-components';
import { numberToRem } from '~/utils/rem';


export const CategoryInfoMoreContentStyled = styled.div`
  margin-top: 12.5rem;

  & .title {
    letter-spacing: 2px;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .categoryRap {
    max-width: ${props => `calc(${props.theme.rap} + ${numberToRem(100, 1)})`};
     margin: 0 auto;
     margin-top: ${numberToRem(40, 1)};
     margin-bottom: ${numberToRem(100, 1)};
  }
`;
