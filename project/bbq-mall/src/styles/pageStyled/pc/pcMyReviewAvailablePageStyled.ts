'use client';

import styled from 'styled-components';

export const PcMyReviewAvailablePageStyled = styled.div`
  &.no-item {
    display: flex;

    align-items: center;
    justify-content: center;
    height: 143px;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray666};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }

  .review-wrapper {
    margin-top: 40px;
    .review-count {
      ${props => props.theme.fontStyle['body02-4']};
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 16px;
    }
    .review-item-wrapper {
      border-top: 1px solid ${props => props.theme.colors.gray999};
    }
  }
`;
