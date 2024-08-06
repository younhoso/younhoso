'use client';

import styled from 'styled-components';

export const MethodSimpleStyled = styled.div`
  padding: 12px 24px 20px;
  background-color: #f6f6f6;
  border: 1px solid ${props => props.theme.colors.grayada};
  border-top: none;
  .Radio {
    display: flex;
    gap: 60px;

    .radio-item {
      gap: 12px;
      border-bottom: none;
    }
  }

  .image-wrapper {
    display: flex;
    align-items: center;
  }

  > ul {
    > li {
      list-style: disc;
      margin-left: 16px;
      padding-left: 4px;
      ${props => props.theme.fontStyle['body04-3']};
      color: ${props => props.theme.colors.gray999};
      &:not(:last-of-type) {
        margin-bottom: 4px;
      }
    }
  }
`;
