'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const ClaimModalMobileStyled = styled(Modal.Mobile)`
  .red-check {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > h3 {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 700;
      color: ${props => props.theme.colors.gray333};
    }
  }

  .info-wrapper {
    padding: 24px;
    margin: 24px 0 20px;
    background-color: #e5e5e5;

    > h6 {
      font-size: 15px;
      font-weight: 500;
      text-align: center;
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 16px;

      > span {
        font-weight: 600;
      }
    }

    > p {
      font-size: 15px;
      font-weight: 500;
      line-height: 22px;
      text-align: center;
      color: ${props => props.theme.colors.gray666};
      > span {
        color: ${props => props.theme.colors.red32D};
      }
    }
  }

  .Button {
    font-size: 15px;
    font-weight: 600;
    padding: 11px;
    height: 40px;

    &.add-cart {
      margin-top: 8px;
    }
  }
`;
