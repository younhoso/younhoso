'use client';

import styled from 'styled-components';

export const MobileOrderPageStyled = styled.div`
  position: relative;
  .OrderPriceInfoMobile {
    padding: 0;
  }

  .submit-form {
    border-top: 1px solid ${props => props.theme.colors.grayada};
    position: sticky;
    background-color: white;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  .payment-button-wrapper {
    padding: 10px 16px;

    > .Button {
      &:disabled {
        background-color: ${props => props.theme.colors.red937} !important;
        border: 1px solid ${props => props.theme.colors.red937} !important;
      }
      width: 100%;
    }
  }
`;
