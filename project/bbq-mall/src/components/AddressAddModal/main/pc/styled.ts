'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const AddressAddModalStyled = styled(Modal)`
  .re-search-wrapper {
    display: flex;
    gap: 8px;
    > .Input {
      flex: 1 0 auto;
    }
    > .Button {
      align-items: center;
      width: 109px;
      height: 46px;
      gap: 4px;
    }
  }
  .middle-input {
    margin: 16px 0 24px;
  }
`;
