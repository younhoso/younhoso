import styled from 'styled-components';

export const ButtonStyled = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${props => props.theme.colors.gray333};
  width: ${props => (props.$fullWidth ? '100%' : '120px')};

  border: 1px solid ${props => props.theme.colors.graybbb};
  cursor: pointer;

  &.big {
    padding: 18px 0;
    ${props => props.theme.fontStyle['body02-3']};
  }

  &.small {
    padding: 15px 0 14px;
    ${props => props.theme.fontStyle['body02-3']};
  }

  &.micro {
    padding: 7px 0 6px;
    ${props => props.theme.fontStyle['body03-3']};
  }

  &.main {
    color: white;
    background-color: ${props => props.theme.colors.red937};
    border: 1px solid ${props => props.theme.colors.red937};
    &:hover {
      background-color: ${props => props.theme.colors.red32D};
      border: 1px solid ${props => props.theme.colors.red32D};
    }
  }

  &.sub {
    color: white;
    background-color: ${props => props.theme.colors.gray333};
    border: 1px solid ${props => props.theme.colors.gray333};
  }

  &:disabled {
    color: white;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.graybbb} !important;
    border: 1px solid ${props => props.theme.colors.graybbb} !important;
  }

  .loading-bar {
    transition: all 0.2s;
    margin-left: 8px;

    &.not-loading {
      opacity: 0;
      width: 0;
      height: 0;
      margin-left: 0;
    }
  }
`;
