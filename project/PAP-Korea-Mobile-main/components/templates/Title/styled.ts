import { numberToRem } from '~/utils/rem';

import styled from 'styled-components';

const fontSize = {
  default: numberToRem(44, 1),
  large: numberToRem(30, 1),
  small: numberToRem(30, 1),
};

export const TitleStyled = styled.div<{
  type: 'left' | 'center' | 'right';
  size: 'default' | 'large' | 'small';
}>`
  display: flex;
  justify-content: ${props => props.type};

  > h2 {
    font-size: ${props => fontSize[props.size]};
  }
`;
