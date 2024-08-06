'use client';

import styled from 'styled-components';

export const PcInquiryPageStyled = styled.div`
  width: 973px;

  .inquiry-button {
    height: 42px;
  }
  .Pagination {
    margin-top: 40px;
  }

  .reply-wait {
    color: ${props => props.theme.colors.gray999};
  }

  .reply-completed {
    color: ${props => props.theme.colors.greena17};
  }

  .inquiry-title {
    width: 100%;
    text-align: start;
    padding: 0 20px;
  }

  .PageTitle {
    border-bottom: none;
    height: 59px;
  }
`;
