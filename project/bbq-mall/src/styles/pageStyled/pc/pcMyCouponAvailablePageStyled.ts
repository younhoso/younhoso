'use client';

import styled from 'styled-components';

export const PcMyCouponAvailablePageStyled = styled.div`
  &.no-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 143px;
    color: ${props => props.theme.colors.gray666};
    ${props => props.theme.fontStyle['body02-5']};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }

  .coupon-wrapper {
    margin: 24px 0 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .download-button {
    width: 80px;
    height: 40px;
    ${props => props.theme.fontStyle['body03-1']};
  }
`;
