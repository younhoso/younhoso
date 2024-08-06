'use client';

import styled from 'styled-components';

export const ReviewableItemMobileStyled = styled.div`
  padding: 16px 0;
  margin: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};

  .reviewable-content {
    display: flex;
    gap: 12px;
    align-items: center;
    .review-item-info {
      flex: 1 0 0;
      min-width: 0;
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray333};
      > p:first-child {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      > p:last-child {
        margin-top: 6px;
        color: ${props => props.theme.colors.gray999};
      }
    }
  }

  .reviewable-button-wrapper {
    margin-top: 12px;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .reviewable-date {
      font-size: 13px;
      font-weight: 500;
      color: ${props => props.theme.colors.red937};
    }

    > .Button {
      height: 40px;
    }
  }
`;
