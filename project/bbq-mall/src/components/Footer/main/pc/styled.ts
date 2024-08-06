'use client';

import styled from 'styled-components';

export const FooterStyled = styled.div`
  background-color: ${props => props.theme.colors.gray333};
  position: relative;
  margin-top: 80px;
  min-width: ${props => props.theme.sizes.maxPcWidth};

  .footer-wrapper {
    max-width: ${props => props.theme.sizes.maxPcWidth};
    margin: 0 auto;

    .footer-category {
      min-height: 406px;
      padding-top: 40px;
      display: flex;
      .footer-category-item {
        width: 320px;
        .footer-category-item-label {
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
          &:before {
            content: '';
            border-top: 3px solid white;
            width: 16px;
            display: block;
            margin-bottom: 16px;
          }
        }

        .footer-category-item-sub-wrapper {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-direction: column;
          .footer-category-item-sub {
            font-size: 16px;
            font-weight: 500;
            line-height: 23px;
            color: ${props => props.theme.colors.gray999};
            > span {
              cursor: pointer;
            }
          }
        }
      }
    }

    .divider {
      width: 100vw;
      max-width: 100%;
      border-bottom: 1px solid ${props => props.theme.colors.gray666};
      position: absolute;
      left: 0;
      top: 406px;
    }

    .footer-description {
      background-color: ${props => props.theme.colors.gray333};
      height: 345px;
      padding-top: 40px;

      .footer-description-logo-wrapper {
        display: flex;
        justify-content: space-between;
        line-height: 16px;
        margin-bottom: 20px;

        .footer-logo {
          cursor: pointer;
        }
        .footer-description-files {
          display: flex;
          font-size: 16px;
          font-weight: 500;
          gap: 16px;
          height: 16px;
          color: ${props => props.theme.colors.gray999};
          & > div {
            cursor: pointer;
            &:not(:last-child) {
              display: flex;
              align-items: center;
              &:after {
                content: '';
                margin-left: 16px;
                border-right: 1px solid ${props => props.theme.colors.gray999};
                height: 13px;
              }
            }

            &:nth-child(2) {
              color: white;
            }
          }
        }
      }

      .footer-description-info {
        font-size: 16px;
        color: ${props => props.theme.colors.gray999};
        font-weight: 500;
        line-height: 23px;
      }

      .footer-description-bottom {
        margin-top: 24px;
        display: flex;
        align-items: end;
        justify-content: space-between;

        .footer-description-bottom-comments {
          font-size: 14px;
          font-weight: 16px;
          line-height: 19px;
          color: ${props => props.theme.colors.gray999};
          > div:last-child {
            margin-top: 8px;
            color: ${props => props.theme.colors.gray666};
          }
        }

        .footer-description-bottom-icons {
          display: flex;
          gap: 8px;

          > img {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
