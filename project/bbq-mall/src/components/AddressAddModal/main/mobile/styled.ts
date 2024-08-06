'use client';

import styled from 'styled-components';

import WrapperModal from '@/components/WrapperModal';

export const AddressAddModalMobileStyled = styled(WrapperModal.Mobile)`
  .wrapper-modal-children {
    padding: 0;
  }

  &.padding-needeed {
    .wrapper-modal-children {
      padding: 20px 16px;
    }
  }

  .re-search-wrapper {
    display: flex;
    gap: 8px;

    > div {
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray333};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    > .Button {
      align-items: center;
      width: 88px;
      flex-shrink: 0;
      gap: 4px;
    }
  }
  .middle-input {
    margin: 16px 0 24px;
  }
`;
