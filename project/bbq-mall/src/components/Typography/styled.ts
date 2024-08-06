'use client';

import styled from 'styled-components';

import { fontSizes, fontWeight } from '@/styles/theme';

export const TypographyStyled = styled.div`
  .title01 {
    font-size: ${fontSizes.font32};
    font-weight: ${fontWeight.bold};
  }
  .title02 {
    font-size: ${fontSizes.font28};
    font-weight: ${fontWeight.bold};
  }
  .title03 {
    font-size: ${fontSizes.font28};
    font-weight: ${fontWeight.semiBold};
  }
`;
