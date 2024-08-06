'use client';

import styled from 'styled-components';

export const MembershipProgressMobileStyled = styled.div`
  padding: 24px 16px 32px;

  .membership-info {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 24px;

    > div {
      .membership-nickname {
        font-size: 15px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray333};
        margin-bottom: 4px;

        > span {
          font-weight: 700;
        }
      }

      .membership-grade {
        font-size: 20px;
        font-weight: 400;
        color: ${props => props.theme.colors.gray333};
        line-height: 18px;
        margin-bottom: 8px;

        > span {
          font-weight: 700;
        }
      }

      .membership-next-month {
        max-width: 170px;
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        color: ${props => props.theme.colors.gray666};
      }
    }
  }
`;
