'use client';

import styled from 'styled-components';

export const MobileInquiryPageStyled = styled.div`
  background-color: white;
  .help-item-wrapper {
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
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    border-top: 1px solid ${props => props.theme.colors.grayaea};
    padding: 10px 16px;
    > .Button {
      width: 100%;
    }
  }
`;
