'use client';

import styled from 'styled-components';

export const PcEventTabsPageStyled = styled.div`
  .event-title {
    text-align: center;
    margin: 60px 0;
    ${props => props.theme.fontStyle['title02-2']}
    color:${props => props.theme.colors.gray333}
  }

  .event-error {
    display: flex;
    min-height: 50vh;
    justify-content: center;
    align-items: center;
  }

  .event-button-inner {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }

  .category-button-inner {
    position: sticky;
    top: ${props => props.theme.sizes.headerHeight};
    background-color: white;
    z-index: 15;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .event-isLoading {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page-inner {
    padding-top: 40px;
  }
`;
