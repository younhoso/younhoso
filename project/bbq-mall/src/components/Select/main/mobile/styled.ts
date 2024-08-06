'use client';

import styled from 'styled-components';

export const SelectMobileStyled = styled.div`
  .select-wrapper {
    padding: 14px 16px 15px;
    border: 1px solid ${props => props.theme.colors.grayada};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    > div {
      font-size: 15px;
      font-weight: 500;
      line-height: 19px;
      color: ${props => props.theme.colors.gray333};
      &.placeholder {
        color: ${props => props.theme.colors.grayada};
      }
    }

    &.disabled {
      background-color: ${props => props.theme.colors.gray5f5};
      border: 1px solid ${props => props.theme.colors.grayada};

      > div {
        color: ${props => props.theme.colors.gray999};
      }
    }
  }
  .screen-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100%;
    height: 100vh;
    max-height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;

    .mobile-select-option-list {
      background-color: white;
      max-height: 80vh;
      overflow: auto;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      border-radius: 12px 12px 0px 0px;

      .option-close {
        position: sticky;
        top: 0;
        padding: 12px 0 16px;
        background-color: white;
        z-index: 1;
        > div {
          width: 40px;
          margin: 0 auto;
          height: 4px;
          border-radius: 8px;
          background-color: ${props => props.theme.colors.grayada};
        }
      }

      .option-wrapper {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: 0 20px 28px;

        > div {
          font-size: 15px;
          color: ${props => props.theme.colors.gray333};
          font-weight: 500;
          line-height: 19px;
          display: flex;
          justify-content: space-between;
          &.option-label {
            font-weight: 600;
          }

          &.disabled {
            cursor: not-allowed;
            color: ${props => props.theme.colors.graybbb};
            .suffix {
              color: ${props => props.theme.colors.graybbb};
            }
          }
        }
      }
    }
  }
`;
