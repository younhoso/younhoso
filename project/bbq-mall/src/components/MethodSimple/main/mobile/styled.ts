'use client';

import styled from 'styled-components';

export const MethodSimpleMobileStyled = styled.div`
  background-color: #f6f6f6;
  margin-top: 20px;
  .virtual-radio-wrapper {
    padding: 8px 20px 0;
    .image-wrapper {
      display: flex;
      height: 20px;
      align-items: center;
    }
  }
  .radio-item {
    border-bottom: none;
    padding: 12px 0;
  }

  > ul {
    padding: 0 16px 20px;
    > li {
      list-style: disc;
      margin-left: 16px;
      padding-left: 4px;
      font-size: 12px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray999};
      &:not(:last-of-type) {
        margin-bottom: 8px;
      }
    }
  }
`;
