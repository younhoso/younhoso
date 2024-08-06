'use client';

import styled from 'styled-components';

export const PcEventWinnerPageStyled = styled.div`
  .event-title {
    text-align: center;
    margin: 60px 0;
    ${props => props.theme.fontStyle['title02-2']}
    color:${props => props.theme.colors.gray333}
  }

  .category-button-inner {
    display: flex;
    z-index: 15;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .page-inner {
    padding-top: 40px;
  }
`;
