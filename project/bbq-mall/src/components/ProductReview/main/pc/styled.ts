'use client';

import styled from 'styled-components';

export const ProductReviewStyled = styled.div`
  p {
    color: ${props => props.theme.colors.gray333};
  }
  .review-description {
    color: ${props => props.theme.colors.gray666};
  }
`;
