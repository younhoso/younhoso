'use client';

import styled from 'styled-components';

export const PcHelpDetailPageStyled = styled.div`
  width: 973px;

  .help-detail-info-title {
    padding: 24px 16px;

    > p {
      margin-bottom: 12px;
      ${props => props.theme.fontStyle['body01-2']};
      color: ${props => props.theme.colors.gray333};
    }

    > div {
      display: flex;
      align-items: center;
      gap: 8px;

      > div {
        &:first-child {
          text-align: center;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          background-color: ${props => props.theme.colors.gray999};
          border-radius: 20px;
        }

        &:last-child {
          ${props => props.theme.fontStyle['body02-3']};
          color: ${props => props.theme.colors.gray333};
        }
      }
    }
  }

  .help-detail-info-content {
    padding: 40px 16px 60px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    img {
      max-width: 941px;
    }
  }

  .help-detail-info-button {
    margin-top: 40px;
    display: flex;
    justify-content: end;
    .Button {
      width: 120px;
      ${props => props.theme.fontStyle['body02-3']};
    }
  }
`;
