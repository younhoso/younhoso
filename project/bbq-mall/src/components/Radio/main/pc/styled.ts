import styled from 'styled-components';

export const RadioStyled = styled.div`
  gap: 16px;

  .radio-item {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;

    padding: 24px 0;

    > input {
      width: 22px;
      height: 22px;
      appearance: none;
      -webkit-appearance: none;
      border-radius: 50%;
      background-color: white;
      cursor: pointer;
      flex-shrink: 0;

      outline: 1px solid #a6a6a6;
      margin: 0 1px;

      &:checked {
        width: 12px;
        height: 12px;
        margin: 0 6px;
        background-color: ${props => props.theme.colors.white};
        outline: 6px solid ${props => props.theme.colors.red937};
      }
    }

    .radio-label {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray333};
    }
    .radio-suffix {
      ${props => props.theme.fontStyle['body03-3']};
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
