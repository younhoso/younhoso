'use client';

import styled from 'styled-components';

export const ProductDeliveryInfoStyled = styled.div`
  margin-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  .delivery-info {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    ${props => props.theme.fontStyle['body02-5']}
    color: ${props => props.theme.colors.gray333};
    p:nth-child(1) {
      width: 142px;
      flex-shrink: 0;
    }
    p:nth-child(2) {
      flex: 1;
    }
  }
`;
