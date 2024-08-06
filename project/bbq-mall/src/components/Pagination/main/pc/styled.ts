import styled from 'styled-components';

export const PaginationStyled = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: center;
  > button {
    width: 80px;
    height: 40px;
    cursor: pointer;
    border: 1px solid ${props => props.theme.colors.grayada};

    &:disabled {
      background-color: ${props => props.theme.colors.gray5f5};
      cursor: not-allowed;
    }
  }

  > div {
    ${props => props.theme.fontStyle['body02-3']};
    color: ${props => props.theme.colors.gray333};
    > span {
      color: ${props => props.theme.colors.gray999};
    }
  }
`;
