'use client';

import styled from 'styled-components';

export const PcMyCouponOwnPageStyled = styled.div`
  &.no-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 143px;
    color: ${props => props.theme.colors.gray666};
    ${props => props.theme.fontStyle['body02-5']};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }

  .coupon-wrapper {
    margin: 24px 0 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .right-arrow-wrpper {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.graybbb};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .coupon-modal-brief {
    padding-top: 8px;

    > div {
      &:first-child {
        margin-bottom: 27px;
        > p {
          &:first-child {
            ${props => props.theme.fontStyle['title03-2']};
            color: ${props => props.theme.colors.gray333};
            margin-bottom: 4px;
          }
          &:last-child {
            ${props => props.theme.fontStyle['body03-3']};
            color: ${props => props.theme.colors.gray333};
          }
        }
      }
      &:last-child {
        > p {
          ${props => props.theme.fontStyle['body04-2']};
          &:first-child {
            color: ${props => props.theme.colors.gray999};
            margin-bottom: 4px;
          }

          &:last-child {
            color: ${props => props.theme.colors.gray333};
          }
        }
      }
    }
  }

  .coupon-modal-description {
    padding-top: 24px;
    margin-top: 40px;
    border-top: 1px solid ${props => props.theme.colors.grayaea};

    h4 {
      margin-bottom: 16px;
      ${props => props.theme.fontStyle['body03-2']};
      color: ${props => props.theme.colors.gray333};
    }

    > li {
      list-style: inherit;
      color: ${props => props.theme.colors.gray666};
      ${props => props.theme.fontStyle['body03-3']};
      text-indent: -18px;
      margin-left: 18px;
    }
  }
`;
