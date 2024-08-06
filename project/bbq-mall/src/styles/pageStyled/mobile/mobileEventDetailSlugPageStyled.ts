'use client';

import styled from 'styled-components';

export const MobileEventDetailSlugPageStyled = styled.div`
  .event-container {
    padding: 0 16px;
  }
  .event-title {
    text-align: center;
    margin: 60px 0;
    ${props => props.theme.fontStyle['title02-2']}
  }
  .event-sub-inner {
    padding: 20px 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  .event-sub-title {
    color: ${props => props.theme.colors.gray333};
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 12px;
  }
  .event-period {
    display: flex;
    align-items: center;
    gap: 8px;

    .label {
      font-size: 12px;
      font-weight: 600;
    }

    p {
      color: ${props => props.theme.colors.gray333};
      font-size: 14px;
      font-weight: 500;
    }
  }
  .event-content-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 20px;
  }

  .event-footer {
    margin-top: 40px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    padding-top: 40px;
  }

  .button-link-inner {
    margin-top: 20px;
    .ButtonLink {
      width: 100%;
      height: 40px;
      font-size: ${props => props.theme.fontSizes.font15};
      font-weight: ${props => props.theme.fontWeight.medium};
      a {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
    }
  }
`;
