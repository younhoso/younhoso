'use client';

import styled from 'styled-components';

export const LoadingStyled = styled.div<{ $height?: string; $differ?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.$height
      ? `
    height:${props.$height}
    `
      : `
   height: calc(100vh - ${props.theme.sizes.headerHeight} - 60px - 80px${props.$differ ? ` - ${props.$differ}` : ''});

   > div {
     transform: translateY(-${props.theme.sizes.headerHeight} - 60px - 80px${props.$differ ? ` - ${props.$differ}` : ''});
   }
  `}
`;
