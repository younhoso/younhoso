'use client';

import styled from 'styled-components';

export const PcMyCouponLayoutStyled = styled.div`
  > h3 {
    margin-top: 32px;
    ${props => props.theme.fontStyle['body01-3']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 8px;
  }

  > h4 {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray999};
    margin-bottom: 40px;
  }

  .coupon-registration {
    display: flex;
    height: 50px;
    gap: 8px;
    > .Input {
      width: 454px;
      height: 100%;
    }
  }

  .coupon-description {
    padding: 24px 20px;
    background-color: ${props => props.theme.colors.gray5f5};
    margin: 16px 0 40px;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray666};
    > p {
      &::before {
        content: '•';
        margin: 0 4px;
      }
    }
  }

  .coupon-button-wrapper {
    display: flex;
    > .Button {
      flex: 1 0 auto;
    }
  }
`;
