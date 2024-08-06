'use client';

import styled from 'styled-components';

export const OrderProductCouponItemStyled = styled.div`
  .info-title {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px dashed ${props => props.theme.colors.grayada};
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
  }

  &:not(:first-child) {
    margin-top: 32px;
    border-top: 1px solid ${props => props.theme.colors.gray999};
  }
`;
