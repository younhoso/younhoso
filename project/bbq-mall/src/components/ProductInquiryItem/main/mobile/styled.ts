'use client';

import styled from 'styled-components';

export const ProductInquiryItemMobileStyled = styled.div`
  .inquiry-item-info {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    padding: 20px 16px;

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;

      > p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &:first-child {
          font-size: 14px;
          font-weight: 500;
          color: ${props => props.theme.colors.gray999};
        }

        &:nth-child(2) {
          font-size: 15px;
          font-weight: 500;
          line-height: 20px;
          color: ${props => props.theme.colors.gray333};
        }

        &:last-child {
          color: ${props => props.theme.colors.gray999};
          font-size: 15px;
          font-weight: 500;
          margin-top: 2px;

          &.replied {
            span {
              color: ${props => props.theme.colors.greena17};
            }
          }
        }
      }
    }
  }

  .inquiry-item-divider {
    width: 100vw;
    background-color: white;

    &::before {
      border-top: 1px solid ${props => props.theme.colors.grayada};
      content: '';
      margin: 0 auto;
      width: calc(100% - 32px);
      display: block;
    }
  }

  .inquiry-item-content {
    opacity: 0;
    max-height: 0;
    transition:
      padding 0.2s,
      max-height 0.2s,
      opacity 0.2s;
    overflow: hidden;
    width: calc(100vw - 32px);
    margin: 0 auto;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};

    &.open {
      background-color: white;
      padding: 20px 0;
      max-height: 10000px;
      opacity: 1;
    }
    display: flex;
    flex-direction: column;
    gap: 20px;

    > div {
      display: flex;
      gap: 12px;
      > div {
        &:first-child {
          width: 23px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background-color: ${props => props.theme.colors.red937};
          color: white;
          font-size: 14px;
          font-weight: 600;
          flex-shrink: 0;
        }

        &:last-child {
          color: ${props => props.theme.colors.gray333};
          font-size: 15px;
          font-weight: 500;
          line-height: 20px;

          > div {
            color: ${props => props.theme.colors.gray666};
            font-size: 15px;
            font-weight: 500;

            margin-top: 12px;
            display: flex;
            gap: 8px;
            > div:first-child {
              display: flex;
              gap: 8px;
              &:after {
                content: '';
                border-right: 2px solid ${props => props.theme.colors.gray666};
                display: block;
                height: 13px;
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
    .inquiry-item-button-wrapper {
      justify-content: end;
      > .Button {
        width: 60px;
        height: 30px;
      }
    }
  }
`;
