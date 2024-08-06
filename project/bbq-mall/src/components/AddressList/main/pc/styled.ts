'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const AddressListStyled = styled(Modal)`
  .close {
    border-bottom: none !important;
    margin-bottom: 0 !important;
  }

  .table-address {
    > p:first-child {
      margin-bottom: 4px;
    }
  }

  .cursor-pointer {
    cursor: pointer;
  }
`;
