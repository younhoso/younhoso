'use client';

import styled from 'styled-components';

import { ImagefillProps } from './Imagefill';

export const ImagefillStyled = styled.div<ImagefillProps>`
  width: 100%;
  height: ${props => props.height};
  position: relative;
  img {
    height: inherit !important;
    position: inherit !important;
  }
  &.main-image-fill {
    width: 100%;
    height: 320px;
    img {
      object-fit: cover;
      width: 100% !important;
    }
  }
`;
