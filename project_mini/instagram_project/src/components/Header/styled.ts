'use client';

import styled from 'styled-components';

export const HeaderStyled = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.grayDAD};

  .item-inner {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;