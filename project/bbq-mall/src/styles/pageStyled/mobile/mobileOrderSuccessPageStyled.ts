'use client';

import styled from 'styled-components';

export const MobileOrderSuccessPageStyled = styled.div`
  background-color: white;
  .order-success-header {
    text-align: center;
    color: ${props => props.theme.colors.gray333};
    > h2 {
      padding-top: 12px;
      margin-bottom: 4px;
      ${props => props.theme.fontStyle['body01-3']};
    }

    > h3 {
      padding-bottom: 12px;
      ${props => props.theme.fontStyle['body01-4']};
      > span {
        color: ${props => props.theme.colors.red937};
      }
    }
  }
  .content-item-wrapper {
    > div {
      padding: 12px 0;
      .order-item-info {
        display: flex;
        align-items: center;
        gap: 12px;

        > div {
          min-width: 0;
          flex: 1;
          > p {
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            color: ${props => props.theme.colors.gray333};
            font-size: 15px;
            font-weight: 500;
            line-height: 20px;
            margin-bottom: 4px;
          }

          > div {
            font-size: 15px;
            font-weight: 600;
            color: ${props => props.theme.colors.gray333};
            > span {
              font-weight: 500;
              color: ${props => props.theme.colors.gray666};
              > span {
                color: ${props => props.theme.colors.grayada};
              }
            }
          }
        }
      }

      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
      .Button {
        width: 100%;
        height: 40px;
      }

      &:not(:last-child) {
        border-bottom: 1px dashed ${props => props.theme.colors.grayada};
      }
    }
  }

  .order-content-button-wrapper {
    > .Button {
      width: 100%;
      &:first-child {
        margin-bottom: 8px;
      }
    }
  }

  .discount-sum {
    color: ${props => props.theme.colors.red32D};
  }

  .discount-list {
    display: flex;
    gap: 6px;

    margin-bottom: 6px;
    transform: translateY(-4px);
    ${props => props.theme.fontStyle['body03-3']};
    color: #a6a6a6;
  }
`;
