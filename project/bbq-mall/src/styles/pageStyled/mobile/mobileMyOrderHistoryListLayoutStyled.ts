'use client';

import styled from 'styled-components';

export const MobileMyOrderHistoryListLayoutStyled = styled.div`
  background-color: white;
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

  .order-number-by {
    padding: 16px;
    .order-number-header {
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 1px solid ${props => props.theme.colors.grayaea};
      color: ${props => props.theme.colors.gray333};
      font-size: 15px;
      font-weight: 600;
    }
  }
`;
