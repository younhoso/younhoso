'use client';

import styled from 'styled-components';

import rightArrow from '@/assets/images/my/right-arrow-grey.svg';
import slash from '@/assets/images/my/slash.svg';

export const PcMyInfoPageStyled = styled.div`
  .my-brief {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .brief-left {
      display: flex;
      gap: 16px;
      align-items: center;

      > div {
        > p {
          color: ${props => props.theme.colors.gray333};
          ${props => props.theme.fontStyle['title02-2']};
          > span {
            ${props => props.theme.fontStyle['title02-1']};
          }
        }
      }
    }

    .brief-right {
      display: flex;
      > div {
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: center;
        height: 72px;
        width: 120px;
        padding-right: 20px;
        border-right: 1px solid ${props => props.theme.colors.grayada};

        > div {
          color: ${props => props.theme.colors.gray333};

          &:first-child {
            display: flex;
            align-items: center;
            gap: 2px;
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 8px;
            cursor: pointer;
          }

          &:last-child {
            ${props => props.theme.fontStyle['title02-2']};
          }
        }
      }
    }
  }

  .brief-button-wrapper {
    display: flex;
    gap: 8px;
    padding-bottom: 32px;
    margin-bottom: 32px;
    border-bottom: 1px solid ${props => props.theme.colors.gray999};
  }

  .my-order {
    .order-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;

      > div {
        display: flex;
        align-items: center;
        &:first-child {
          gap: 8px;
          color: ${props => props.theme.colors.gray999};
          ${props => props.theme.fontStyle['body02-5']};

          > span {
            color: ${props => props.theme.colors.gray333};
            ${props => props.theme.fontStyle['body01-3']};
          }
        }

        &:last-child {
          gap: 2px;
          cursor: pointer;
          color: ${props => props.theme.colors.gray333};
          ${props => props.theme.fontStyle['body02-5']};
        }
      }
    }
    .order-button-wrapper {
      display: flex;
      > .Button {
        padding: 13px auto 12px;
        height: 48px;
        ${props => props.theme.fontStyle['body02-5']};
        flex: 1 0 auto;

        &.no-active {
          color: ${props => props.theme.colors.gray999};
        }
      }
    }

    .order-status {
      display: flex;
      min-height: 173px;
      justify-content: center;

      padding: 32px 0 40px;

      > div {
        > div {
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 6px;

          > p {
            color: ${props => props.theme.colors.gray666};

            &:first-child {
              ${props => props.theme.fontStyle['title01']};
            }

            &:last-child {
              ${props => props.theme.fontStyle['body02-3']};
            }
          }
        }

        &:not(:last-child) {
          display: flex;
          align-items: center;
          gap: 10px;

          &::after {
            content: '';
            background-image: url(${rightArrow?.src || rightArrow});
            background-repeat: no-repeat;
            background-size: 36px;
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }

          &.slash {
            &::after {
              background-image: url(${slash?.src || slash});
            }
          }
        }
      }
    }
  }

  .table-product-info {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

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

  .table-order-number {
    ${props => props.theme.fontStyle['body03-3']};
    color: ${props => props.theme.colors.gray333};

    > h4 {
      ${props => props.theme.fontStyle['body01-3']};
      margin-bottom: 12px;
    }
    > div {
      color: ${props => props.theme.colors.gray666};
    }

    > button {
      text-decoration-line: underline;
      cursor: pointer;
    }
  }

  .table-order-status {
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
  }

  .red-needed {
    color: ${props => props.theme.colors.red937};
  }

  .show-detail {
    margin: 40px auto 0;
    width: 280px;
  }
`;
