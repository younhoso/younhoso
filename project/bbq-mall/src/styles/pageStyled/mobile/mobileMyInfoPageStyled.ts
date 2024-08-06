'use client';

import styled from 'styled-components';

export const MobileMyInfoPageStyled = styled.div`
  background-color: white;

  > div {
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  }

  .mobile-my-page-info {
    padding: 20px 16px;

    .my-page-brief {
      display: flex;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 1px dashed ${props => props.theme.colors.grayada};

      > div {
        display: flex;
        align-items: center;
        gap: 12px;
        > div {
          > p {
            color: ${props => props.theme.colors.gray333};
            &:first-child {
              font-size: 15px;
              margin-bottom: 4px;
              font-weight: 500;
              > span {
                font-weight: 700;
              }
            }

            &:last-child {
              font-size: 20px;
              font-weight: 400;
              line-height: 18px;
              > span {
                font-weight: 700;
              }
            }
          }
        }
      }

      > p {
        white-space: nowrap;
        font-size: 13px;
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};
        text-decoration: underline;
      }
    }

    .my-page-info {
      display: flex;
      align-items: center;
      justify-content: center;

      padding-top: 18px;
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        gap: 2px;
        position: relative;

        > img {
          margin-bottom: 4px;
        }

        > div {
          font-size: 14px;
          font-weight: 500;
          color: ${props => props.theme.colors.gray666};
        }
        > p {
          font-size: 16px;
          font-weight: 600;
          color: ${props => props.theme.colors.red937};
        }

        &:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          height: 100%;
          border-right: 1px solid ${props => props.theme.colors.grayada};
        }
      }
    }
  }
`;
