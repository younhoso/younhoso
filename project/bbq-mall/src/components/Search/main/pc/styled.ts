'use client';

import styled from 'styled-components';

export const SearchStyled = styled.label`
  width: 100%;
  height: 48px;
  border-radius: 36px;
  border: 1px solid ${props => props.theme.colors.grayaea};
  background-color: #f6f6f6;
  display: block;
  position: relative;
  padding: 14px 15px 16px;

  &:focus-within {
    border: 1px solid ${props => props.theme.colors.red32D};
  }

  input {
    color: ${props => props.theme.colors.gray333};
    height: 19px;
    font-size: 16px;
    width: calc(100% - 15px * 2 - 1px * 2);
    background-color: inherit;

    &::placeholder {
      color: #b5b5b5;
    }
  }

  .delete-icon {
    position: absolute;
    top: 14px;
    right: 54px;
    cursor: pointer;
  }

  .search-icon {
    position: absolute;
    right: 12px;
    top: 9px;
    cursor: pointer;
  }
`;
