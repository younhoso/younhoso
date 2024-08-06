'use client';

import styled from 'styled-components';

export const MethodVirtualAccountStyled = styled.div`
  padding: 12px 24px 20px;
  background-color: #f6f6f6;
  border: 1px solid ${props => props.theme.colors.grayada};
  border-top: none;
  .Radio {
    display: flex;
    gap: 60px;

    .radio-item {
      border-bottom: none;
    }
  }
`;
