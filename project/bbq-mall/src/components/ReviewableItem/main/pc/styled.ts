'use client';

import styled from 'styled-components';

export const ReviewableItemStyled = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  padding: 24px 0;
  display: flex;
  align-items: center;
  gap: 24px;

  .review-item-info {
    flex: 1 0 auto;

    > p:first-child {
      ${props => props.theme.fontStyle['body02-5']}
      color:${props => props.theme.colors.gray333};
    }

    > p:last-child {
      ${props => props.theme.fontStyle['body03-3']}
      color:${props => props.theme.colors.gray999};
    }
  }

  .reviewable-date {
    ${props => props.theme.fontStyle['body03-3']}
    color:${props => props.theme.colors.gray999};
  }

  &:last-child {
    margin-bottom: 40px;
  }
`;
