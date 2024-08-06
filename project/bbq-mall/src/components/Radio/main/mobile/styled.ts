'use client';

import styled from 'styled-components';

export const RadioMobileStyled = styled.div`
  gap: 16px;

  .radio-item {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;

    padding: 20px 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};

    > input {
      width: 18px;
      height: 18px;
      appearance: none;
      -webkit-appearance: none;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
      flex-shrink: 0;

      outline: 1px solid #a6a6a6;
      margin: 0 1px;

      &:checked {
        width: 8px;
        height: 8px;
        margin: 0 6px;
        background-color: ${props => props.theme.colors.white};
        outline: 6px solid ${props => props.theme.colors.red937};
      }
    }

    .radio-label {
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      color: ${props => props.theme.colors.gray333};
    }
    .radio-suffix {
      margin-top: 2px;
      font-size: 14px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray666};
    }

    &.disabled {
      color: ${props => props.theme.colors.gray999};
      cursor: not-allowed;
      > input {
        background-color: ${props => props.theme.colors.gray5f5};
        border: none;
        cursor: not-allowed;
        outline: 1px solid ${props => props.theme.colors.grayada};

        &:checked {
          background-color: ${props => props.theme.colors.white};
          outline: 6px solid ${props => props.theme.colors.grayada};
        }
      }
    }
  }
`;
