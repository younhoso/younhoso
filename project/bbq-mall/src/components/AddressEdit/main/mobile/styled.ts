'use client';

import styled from 'styled-components';

export const AddressEditMobileStyled = styled.form`
  .address-label {
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray333};
  }

  .margin-added {
    margin-top: 16px;
  }

  .address-button-wrapper {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    gap: 8px;
    padding: 10px 16px;
    border-top: 1px solid ${props => props.theme.colors.grayaea};

    > .Button {
      &.full-width {
        flex: 1 0 auto;
      }
    }
  }
`;
