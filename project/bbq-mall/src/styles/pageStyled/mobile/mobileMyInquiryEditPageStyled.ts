'use client';

import styled from 'styled-components';

export const MobileMyInquiryEditPageStyled = styled.div`
  position: relative;
  background-color: white;
  padding: 16px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .inquiry-edit-item-info {
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    padding-bottom: 16px;

    > div {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      color: ${props => props.theme.colors.gray333};
    }
  }

  .save-button-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 16px;
    border-top: 1px solid ${props => props.theme.colors.grayaea};
    > .Button {
      width: 100%;
    }
  }
`;
