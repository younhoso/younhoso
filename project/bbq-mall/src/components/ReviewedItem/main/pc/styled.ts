'use client';

import styled from 'styled-components';

export const ReviewedItemStyled = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};

  .review-item-info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    .review-image-wrapper {
      position: relative;
      height: 84px;

      > div {
        position: absolute;
        right: 0;
        bottom: 0;
        color: white;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        ${props => props.theme.fontStyle['body02-3']};
      }
    }

    .review-item-detail {
      min-width: 0;
      flex: 1 0 0;
      > p {
        margin-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 0;
      }
      > div {
        display: flex;
        gap: 8px;
        align-items: center;

        > div:last-child {
          ${props => props.theme.fontStyle['body03-3']};
          color: ${props => props.theme.colors.gray999};
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
  }

  .review-item-content {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 20px;

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
    gap: 8px;
    align-items: center;
    ${props => props.theme.fontStyle['body03-3']};
    color: ${props => props.theme.colors.gray333};
    cursor: pointer;

    .arrow-wrapper {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid ${props => props.theme.colors.graybbb};
    }
  }
`;
