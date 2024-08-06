'use client';

import styled from 'styled-components';

export const ReviewedItemMobileStyled = styled.div`
  padding: 20px 0 16px;
  margin: 0 16px;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  .review-item-info {
    display: flex;
    align-items: center;
    gap: 12px;
    .review-image-wrapper {
      position: relative;
      width: 72px;
      height: 72px;

      > div {
        position: absolute;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        text-align: center;
        width: 24px;
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        font-weight: 500;
      }
    }

    .review-item-detail {
      overflow: hidden;
      justify-content: center;
      gap: 6px;

      > p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        font-weight: 500;
        line-height: 20px;
        color: ${props => props.theme.colors.gray333};
      }

      .rate-list {
        margin: 6px 0 8px;
      }

      .modif-ydate-wrapper {
        color: ${props => props.theme.colors.gray999};
        font-size: 14px;
        font-weight: 4500;
        display: flex;
        align-items: center;

        span:not(:first-child) {
          margin-left: 6px;
          display: flex;
          align-items: center;
          &::before {
            margin-right: 6px;
            display: block;
            height: 12px;
            width: 0;
            content: '';
            border-left: 1px solid ${props => props.theme.colors.gray999};
          }
        }
      }
    }
  }

  .review-item-content {
    color: ${props => props.theme.colors.gray333};
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 12px;
    margin-top: 16px;

    &.closed {
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 3;
    }
  }

  .change-open-button {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 16px;

    .arrow-wrapper {
      background-color: white;
      border: 1px solid ${props => props.theme.colors.graybbb};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
    }
  }

  > .Button {
    height: 40px;
    width: 100%;
  }
`;
