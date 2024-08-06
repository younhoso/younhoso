import { modalCssString } from '~/utils/modalCssString';

import styled from 'styled-components';

export const FilmModalStyled = styled.div`
  ${modalCssString({ opacity: 0.7 })};

  > .closeButton {
    cursor: pointer;
    position: absolute;
    z-index: 9999;
    top: 0;
    right: 0;
    background: transparent;
    color: white !important;
    svg {
      path {
        stroke: white;
      }
    }
  }
`;
