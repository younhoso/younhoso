'use client';

import styled from 'styled-components';

export const PcEventDetailSlugPageStyled = styled.div`
  .event-title {
    text-align: center;
    margin-bottom: 60px;
    ${props => props.theme.fontStyle['title02-2']}
    color:${props => props.theme.colors.gray333};
  }
  .event-sub-inner {
    padding: 24px 0;
    border-top: 2px solid ${props => props.theme.colors.gray999};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  .event-sub-title {
    ${props => props.theme.fontStyle['body01-2']}
    color:${props => props.theme.colors.gray333};
    margin-bottom: 12px;
  }
  .event-content-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 40px;
  }
  .event-period {
    display: flex;
    align-items: center;
    gap: 8px;
    .label {
      font-size: 14px;
      font-weight: 600;
    }

    p {
      ${props => props.theme.fontStyle['body02-3']};
      color: ${props => props.theme.colors.gray333};
    }
  }
  .event-footer {
    margin-top: 40px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    padding-top: 40px;
    text-align: right;
    ${props => props.theme.fontStyle['body02-3']};
    color: ${props => props.theme.colors.gray333};
  }
`;
