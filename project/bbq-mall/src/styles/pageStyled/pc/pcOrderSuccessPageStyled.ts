'use client';

import styled from 'styled-components';

export const PcOrderSuccessPageStyled = styled.div`
  .order-success-header {
    text-align: center;
    > h2 {
      margin-bottom: 8px;
      ${props => props.theme.fontStyle['title02-2']};
      color: ${props => props.theme.colors.gray333};
      margin-top: 24px;
    }

    > h3 {
      ${props => props.theme.fontStyle['title03-2']};
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 80px;
      > span {
        color: ${props => props.theme.colors.red937};
      }
    }
  }

  .order-success-content-wrapper {
    margin: 0 auto;
    width: 841px;

    .content-item-list {
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 25px;
        padding: 24px 0;

        &:first-child {
          padding-top: 0;
        }

        &:last-child {
          padding-bottom: 0;
        }

        &:not(:last-child) {
          border-bottom: 1px dashed ${props => props.theme.colors.grayada};
        }

        .product-label-title {
          display: flex;
          gap: 20px;
          align-items: center;
          width: 60%;

          > div {
            > p {
              &:first-child {
                cursor: pointer;
                ${props => props.theme.fontStyle['body02-4']};
                color: ${props => props.theme.colors.gray333};
                margin-bottom: 4px;
              }

              &:last-child {
                ${props => props.theme.fontStyle['body02-5']};
                color: ${props => props.theme.colors.gray666};
              }
            }
          }
        }
      }
    }

    > .OrderContentTemplate {
      margin-bottom: 24px;
    }
    > ul {
      > li {
        list-style: inherit;
        list-style-type: disc;
        ${props => props.theme.fontStyle['body04-3']};
        color: ${props => props.theme.colors.gray999};
        margin-left: 12px;
        &:first-child {
          margin-bottom: 4px;
        }

        &:last-child {
          margin-bottom: 40px;
        }
      }
    }
    .order-button-wrapper {
      display: flex;
      gap: 8px;
      > .Button {
        flex: 1 0 0;
      }
    }
  }

  .discount-sum {
    > span {
      color: ${props => props.theme.colors.red32D};
    }
  }

  .discount-list {
    display: flex;
    justify-content: space-between;
    transform: translateY(-4px);
    margin-bottom: 8px;
    ${props => props.theme.fontStyle['body03-3']};
    color: #a6a6a6;
  }

  .total-sum {
    span {
      color: ${props => props.theme.colors.red32D};
    }
  }
`;
