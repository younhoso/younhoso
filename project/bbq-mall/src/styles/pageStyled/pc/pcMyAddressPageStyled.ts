'use client';

import styled from 'styled-components';

export const PcMyAddressPageStyled = styled.div`
  .add-address-button {
    padding: 11px 20px 10px;
    ${props => props.theme.fontStyle['body03-2']};
    white-space: nowrap;
    width: 130px;
  }

  img {
    &.cursor-pointer {
      cursor: pointer;
    }
  }
`;
