'use client';

import styled from 'styled-components';

export const SearchMobileStyled = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 36px;
  border: 1px solid ${props => props.theme.colors.grayaea};
  background-color: #f6f6f6;
  display: block;
  position: relative;
  padding: 5px 16px 7px;

  &:focus-within {
    border: 1px solid ${props => props.theme.colors.red32D};
  }

  input {
    color: ${props => props.theme.colors.gray333};
    font-size: 14px;
    font-weight: 500;
    width: calc(100% - 23px * 2 - 1px * 2);
    background-color: inherit;

    &::placeholder {
      color: #b5b5b5;
    }
  }

  .delete-icon {
    position: absolute;
    top: 8px;
    right: 40px;
    cursor: pointer;
  }

  .search-icon {
    position: absolute;
    right: 12px;
    top: 5px;
    cursor: pointer;
  }
`;
