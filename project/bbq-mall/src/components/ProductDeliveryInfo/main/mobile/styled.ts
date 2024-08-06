'use client';

import styled from 'styled-components';

export const ProductDeliveryInfoMobileStyled = styled.div`
  margin-top: 24px;
  padding: 0 16px 20px 16px;
  .delivery-info {
    display: flex;
    margin-bottom: 20px;
    p {
      font-size: ${props => props.theme.fontSizes.font15};
      font-weight: ${props => props.theme.fontWeight.medium};
      color: ${props => props.theme.colors.gray333};
    }
    p:nth-child(1) {
      width: 90px;
      flex-shrink: 0;
      line-height: 21px;
      color: ${props => props.theme.colors.gray666};
    }
    p:nth-child(2) {
      width: 253px;
      line-height: 22px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
