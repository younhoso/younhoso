'use client';

import styled from 'styled-components';

export const MobileMyAddressPageStyled = styled.div`
  background-color: white;
  position: relative;
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

  .address-item-wrapper {
    padding: 0 16px;
  }

  .add-address-button-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    padding: 10px 16px;
    border-top: 1px solid ${props => props.theme.colors.grayaea};
    > .Button {
      width: 100%;
    }
  }
`;
