'use client';

import styled from 'styled-components';

export const MyItemMobileStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 20px 0;
  margin: 0 16px;
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.gray333};

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  }
`;
