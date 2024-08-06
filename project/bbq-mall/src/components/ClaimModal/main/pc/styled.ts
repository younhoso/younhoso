'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const ClaimModalStyled = styled(Modal)`
  .red-check {
    margin: 16px 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    flex-direction: column;

    > h3 {
      ${props => props.theme.fontStyle['body01-2']};
      color: ${props => props.theme.colors.gray333};
    }
  }

  .info-wrapper {
    padding: 32px;
    background-color: #f6f6f6;
    text-align: center;
    margin-bottom: 24px;

    > h6 {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 8px;
      > span {
        ${props => props.theme.fontStyle['body02-4']};
      }
    }

    > p {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray666};
      > span {
        color: ${props => props.theme.colors.red32D};
      }
    }
  }

  .Button {
    ${props => props.theme.fontStyle['body02-4']};

    &.add-cart {
      margin-top: 10px;
    }
  }
`;
