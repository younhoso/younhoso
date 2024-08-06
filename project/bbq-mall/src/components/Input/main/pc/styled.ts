'use client';

import styled from 'styled-components';

export const InputStyled = styled.div`
  position: relative;
  .label-wrapper {
    display: flex;
    height: inherit;

    align-items: center;
    .label {
      ${props => props.theme.fontStyle['body02-5']}

      color: ${props => props.theme.colors.gray333};
      width: 136px;
      > span {
        color: ${props => props.theme.colors.red937};
      }
    }

    .input-wrapper {
      flex: 1 0 auto;
      border: 1px solid ${props => props.theme.colors.grayada};
      background-color: white;
      display: flex;
      padding: 13px 0 12px;
      height: inherit;
      align-items: center;
      justify-content: space-between;
      cursor: text;
      font-size: 13px;
      position: relative;

      .delete-icon {
        position: absolute;
        cursor: pointer;
        right: 14px;
      }

      .input-forward {
        display: flex;
        align-items: center;
        width: 100%;
      }

      input {
        border: 0;
        width: 100%;
        height: 100%;
        padding: 0 14px;
        ${props => props.theme.fontStyle['body02-5']}

        color: ${props => props.theme.colors.gray333};

        &::placeholder,
        &::-webkit-input-placeholder {
          color: ${props => props.theme.colors.grayada};
        }

        &:-ms-input-placeholder {
          color: ${props => props.theme.colors.grayada};
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
      }

      &:hover {
        border: 1px solid ${props => props.theme.colors.gray333};
      }

      &.focus {
        border: 1px solid ${props => props.theme.colors.gray333};
      }

      &.error {
        border: 1px solid ${props => props.theme.colors.red937};
      }

      &.disabled {
        background-color: ${props => props.theme.colors.gray5f5};
        cursor: not-allowed;
        border: 1px solid ${props => props.theme.colors.grayada};
        input {
          background-color: ${props => props.theme.colors.gray5f5};
          cursor: not-allowed;
          color: ${props => props.theme.colors.gray999};
        }
      }
    }
  }

  .help {
    margin-top: 8px;
    font-size: 12px;
    color: ${props => props.theme.colors.gray333};
    &.helpError {
      color: ${props => props.theme.colors.red937};
    }
  }
`;
