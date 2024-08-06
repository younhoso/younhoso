'use client';

import styled from 'styled-components';

export const PcMyInquiryPageStyled = styled.div`
  > .Table {
    margin: 32px 0 40px;
    .title-wrapper {
      display: flex;
      gap: 20px;
      align-items: center;

      > div {
        > p {
          &:first-child {
            ${props => props.theme.fontStyle['body03-3']};
            color: ${props => props.theme.colors.gray999};
            margin-bottom: 4px;
          }

          &:last-child {
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }
      }
    }

    .reply-wait {
      color: ${props => props.theme.colors.gray999};
    }

    .reply-completed {
      color: ${props => props.theme.colors.greena17};
    }
  }
`;
