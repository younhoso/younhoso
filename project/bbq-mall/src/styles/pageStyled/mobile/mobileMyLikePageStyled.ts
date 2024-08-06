'use client';

import styled from 'styled-components';

export const MobileMyLikePageStyled = styled.div`
  min-height: calc(
    100vh - ${props => props.theme.sizes.mobileHeaderHeight} - 10px -
      ${props => props.theme.sizes.navHeight}
  );
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 16px;
  &.align-center {
    align-items: center;
    justify-content: center;
    gap: 40px;

    > p {
      color: ${props => props.theme.colors.graybbb};
      font-size: 15px;
      font-weight: 500;
    }
  }

  .mobile-like-item {
    &:not(:first-child) {
      padding-top: 24px;
    }

    &:not(:last-child) {
      border-bottom: 1px dashed ${props => props.theme.colors.graybbb};
      padding-bottom: 24px;
    }

    > div {
      display: flex;
      align-items: center;

      &.like-item-info {
        margin-bottom: 12px;
        gap: 12px;

        > div {
          color: ${props => props.theme.colors.gray333};
          font-size: 15px;
          font-weight: 500;
          line-height: 20px;
          > p {
            margin-bottom: 6px;
          }

          > div {
            display: flex;
            gap: 6px;

            > p {
              &:first-child {
                font-size: 16px;
                font-weight: 600;
              }

              &:not(:first-child) {
                color: ${props => props.theme.colors.graybbb};
                font-size: 14px;
                font-weight: 500;
                text-decoration-line: line-through;
              }
            }
          }
        }
      }

      &.like-item-button-wrapper {
        gap: 8px;
        > .Button {
          flex: 1 0 auto;
        }
      }
    }
  }
`;
