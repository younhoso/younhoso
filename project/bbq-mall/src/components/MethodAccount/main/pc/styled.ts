'use client';

import styled from 'styled-components';

export const MethodAccountStyled = styled.div`
  padding: 20px 24px;
  background-color: #f6f6f6;
  border: 1px solid ${props => props.theme.colors.grayada};
  border-top: none;

  .change-bank {
    display: flex;
    gap: 8px;

    > div {
      flex: 1 0 0;
    }
  }
`;
