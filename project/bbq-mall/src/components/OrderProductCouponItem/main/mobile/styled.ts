'use client';

import styled from 'styled-components';

export const OrderProductCouponItemMobileStyled = styled.div`
  .info-title {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px dashed ${props => props.theme.colors.grayada};
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;

    > p {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &:not(:first-child) {
    margin-top: 32px;
    border-top: 1px solid ${props => props.theme.colors.gray999};
  }
`;
