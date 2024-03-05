'use client';

import styled from 'styled-components';

export const HomePageStyled = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  > div {
    flex: 1;
  }
  .sidebar-inner {
    margin-left: 40px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;