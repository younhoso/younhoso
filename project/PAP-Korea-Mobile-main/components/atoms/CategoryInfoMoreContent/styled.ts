import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

export const CategoryInfoMoreContentStyled = styled.div`
  transform: translateY(-0.2rem);
  margin-bottom: -0.3rem;
  padding-top: 5rem;

  & .title {
    letter-spacing: 0.5px;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .categoryRap {
    max-width: ${props => props.theme.rap};
    margin: 0 auto;
    margin-top: ${numberToRem(40, 1)};
    padding-bottom: ${numberToRem(100, 1)};
  }
`;
