'use client';

import styled from 'styled-components';

export const MobileHelpPageStyled = styled.div`
  background-color: white;
  .mobile-help-item-wrappper {
    padding: 0 16px;
  }

  &.no-item {
    display: flex;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
    min-height: calc(
      100vh - ${props => props.theme.sizes.mobileHeaderHeight} - 10px -
        ${props => props.theme.sizes.navHeight}
    );
    color: ${props => props.theme.colors.graybbb};
    font-size: 15px;
    font-weight: 500;
  }
`;
