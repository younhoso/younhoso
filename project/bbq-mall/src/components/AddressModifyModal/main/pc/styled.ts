'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const AddressModifyModalStyled = styled(Modal)`
  .modal-label {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 8px;
  }

  .Input {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
