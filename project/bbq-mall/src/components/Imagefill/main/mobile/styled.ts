'use client';

import styled from 'styled-components';

import { ImagefillMobileProps } from './ImagefillMobile';

export const ImagefillMobileStyled = styled.div<ImagefillMobileProps>`
  width: 100%;
  height: ${props => props.height};
  position: relative;
  img {
    vertical-align: middle;
    height: inherit !important;
    position: inherit !important;
  }
  &.main-image-fill {
    position: absolute;
  }
`;
