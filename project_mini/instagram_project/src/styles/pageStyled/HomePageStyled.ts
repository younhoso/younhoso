'use client';

import styled from 'styled-components';

export const HomePageStyled = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  > div {
    flex: 1;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;