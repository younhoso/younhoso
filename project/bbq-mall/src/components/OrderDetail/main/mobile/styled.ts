'use client';

import styled from 'styled-components';

export const OrderDetailMobileStyled = styled.div`
  &.no-item {
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    min-height: calc(
      100vh - ${props => props.theme.sizes.mobileHeaderHeight} - 10px -
        ${props => props.theme.sizes.navHeight}
    );
    color: ${props => props.theme.colors.graybbb};
    font-size: 15px;
    font-weight: 500;
  }

  .mobile-order-top-content-box {
    .content-item-wrapper {
      > div {
        padding-top: 16px;

        &:not(:last-child) {
          padding-bottom: 16px;
        }
        .order-item-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;

          > div {
            min-width: 0;
            flex: 1;

            > p {
              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              color: ${props => props.theme.colors.gray333};
              font-size: 15px;
              font-weight: 500;
              line-height: 20px;
              margin-bottom: 4px;

              &.chosen-option {
                margin-bottom: 8px;
                line-height: 20px;
                font-size: 13px;
                color: ${props => props.theme.colors.gray999};
              }
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

                &:last-child {
                  float: right;
                  color: ${props => props.theme.colors.red937};
                }
              }
            }
          }
        }

        .product-button-wrapper {
          .Button {
            width: 100%;
            height: 40px;
            &:not(:last-child) {
              margin-bottom: 8px;
            }
          }
        }

        &:not(:last-child) {
          border-bottom: 1px dashed ${props => props.theme.colors.grayada};
        }
      }
    }

    .order-history-detail-button-wrapper {
      .Button {
        width: 100%;
        height: 40px;
        font-size: 15px;
        font-weight: 500;

        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }

    .content-box-children {
      margin: 0;
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

  .payment-sum {
    color: ${props => props.theme.colors.red32D};
  }

  .stress-needed {
    font-size: 18px;
  }
`;
