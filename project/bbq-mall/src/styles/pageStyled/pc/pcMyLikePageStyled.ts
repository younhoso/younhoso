'use client';

import styled from 'styled-components';

export const PcMyLikePageStyled = styled.div`
  .my-like-content {
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    flex-direction: column;
    margin-bottom: 40px;

    &.min-height-set {
      align-items: center;
      justify-content: center;
      height: 143px;
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray666};
    }

    .my-like-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 24px 0;

      .my-like-item-info {
        flex: 1 0 auto;
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray333};
        > p {
          cursor: pointer;
          margin-bottom: 4px;
        }

        > div {
          display: flex;
          gap: 4px;
          > p:not(:first-child) {
            text-decoration-line: line-through;
            color: ${props => props.theme.colors.graybbb};
          }
        }
      }

      .my-like-button-wrapper {
        > .Button {
          height: 40px;
          &:first-child {
            margin-bottom: 4px;
          }
        }
      }
      &:not(:last-child) {
        border-bottom: 1px dashed ${props => props.theme.colors.grayada};
      }
    }
  }
`;
