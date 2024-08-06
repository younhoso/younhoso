import styled from 'styled-components';

export const TextareaStyled = styled.div`
  .label-wrapper {
    display: flex;

    .label {
      margin-top: 10px;
      ${props => props.theme.fontStyle['body02-5']}
      color: ${props => props.theme.colors.gray333};
      width: 136px;
      > span {
        color: ${props => props.theme.colors.red937};
      }
    }

    .textarea-wrapper {
      background-color: white;
      flex: 1 0 auto;
      border: 1px solid ${props => props.theme.colors.grayada};
      position: relative;

      .count {
        ${props => props.theme.fontStyle['body03-3']};
        text-align: end;
        padding: 10px;
        border-top: 1px solid ${props => props.theme.colors.grayada};

        color: #b5b5b5;

        > span {
          &.has-length {
            color: ${props => props.theme.colors.gray333};
          }
        }
      }

      &:hover,
      &.focus {
        border: 1px solid ${props => props.theme.colors.gray333};
      }

      &.error {
        border: 1px solid ${props => props.theme.colors.red937};
      }

      .textarea-padding {
        padding: 16px;
        min-height: 216px;
        textarea {
          display: block;
          resize: none;
          border: none;
          width: 100%;
          &.resizable {
            resize: vertical;
          }
          padding: 0px;
          outline: none;
          color: ${props => props.theme.colors.gray333};
          ${props => props.theme.fontStyle['body02-5']};

          &::placeholder,
          &::-webkit-input-placeholder {
            color: ${props => props.theme.colors.grayada};
          }

          &:-ms-input-placeholder {
            color: ${props => props.theme.colors.grayada};
          }

          &::-webkit-resizer {
            display: none;
          }
        }
      }

      &.disabled {
        border: 1px solid ${props => props.theme.colors.grayada};
        background-color: ${props => props.theme.colors.white};
        textarea {
          cursor: not-allowed;
          resize: none;
        }
      }
    }
  }

  .help {
    margin-top: 8px;
    font-size: 12px;
    color: ${props => props.theme.colors.gray666};
    &.helpError {
      color: ${props => props.theme.colors.red937};
    }
  }
`;
