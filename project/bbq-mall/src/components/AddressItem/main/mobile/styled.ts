'use client';

import styled from 'styled-components';

export const AddressItemMobileStyled = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;

  .address-content {
    flex: 1 0 0;
    min-width: 0;

    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      color: ${props => props.theme.colors.gray333};

      &:last-child {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
        color: ${props => props.theme.colors.gray999};
      }
    }
  }

  .modify-icon {
    cursor: pointer;
  }

  &:not(:last-child) {
    border-bottom: 1px dashed ${props => props.theme.colors.grayada};
  }
`;
