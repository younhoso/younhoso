'use client';

import styled from 'styled-components';

export const OrderHistoryItemMobileStyled = styled.div`
  padding-top: 16px;

  &:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: 1px dashed ${props => props.theme.colors.grayaea};
  }
  .order-history-info {
    display: flex;
    align-items: center;
    gap: 12px;

    > div {
      flex: 1 0 0;
      > p {
        min-width: 0;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;

        font-size: 15px;
        font-weight: 500;
        line-height: 20px;
        &.history-product-name {
          color: ${props => props.theme.colors.gray333};
          margin-bottom: 4px;
        }

        &.history-option-name {
          color: ${props => props.theme.colors.gray666};
          margin-bottom: 8px;
        }
      }

      > div {
        display: flex;
        justify-content: space-between;

        > div {
          &:first-child {
            font-size: 15px;
            font-weight: 600;

            color: ${props => props.theme.colors.gray333};

            > span {
              font-weight: 500;
              color: ${props => props.theme.colors.grayada};
              > span {
                color: ${props => props.theme.colors.gray666};
              }
            }
          }

          &:last-child {
            font-size: 15px;
            font-weight: 600;

            color: ${props => props.theme.colors.red937};
          }
        }
      }
    }
  }
`;
