'use client';

import styled from 'styled-components';

export const ProductQnaTableStyled = styled.div`
  &.fullWidth {
    > table {
      width: 100%;
    }
  }

  > table {
    border-collapse: collapse;

    thead {
      border-top: 1px solid ${props => props.theme.colors.gray999};
      border-bottom: 1px solid ${props => props.theme.colors.grayada};
      tr {
        td {
          ${props => props.theme.fontStyle['body02-4']};
          color: ${props => props.theme.colors.gray333};
          text-align: center;
          padding: 16px;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid ${props => props.theme.colors.grayada};
        cursor: pointer;
        td {
          position: relative;

          .tdContent {
            padding: 24px 24px;
            display: flex;
            justify-content: center;
            ${props => props.theme.fontStyle['body02-3']}
            color:${props => props.theme.colors.gray333};

            &.align-start {
              justify-content: start;
            }
          }

          .secreted {
            color: ${props => props.theme.colors.gray999};
            img {
              margin-left: 4px;
            }
          }
          .reply-wait {
            color: ${props => props.theme.colors.gray999};
          }
          .reply-completed {
            color: ${props => props.theme.colors.greena17};
          }
        }

        &.table-dropdown {
          display: none;
          width: 100%;

          &.show {
            display: block;
          }
        }
      }
    }
  }

  > .empty {
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.gray666};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }

  .main-text {
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.gray5f5};
    cursor: default;
    td {
      > p {
        padding: 24px;
        color: ${props => props.theme.colors.gray333};
        ${props => props.theme.fontStyle['body02-5']};
        display: flex;
        align-items: flex-start;
        img {
          margin-right: 16px;
        }
      }
      .answers-inner {
        max-width: 1220px;
        margin: 0 auto;
        padding: 24px 0;
        border-top: 1px dashed ${props => props.theme.colors.grayada};
        display: flex;
        img {
          margin-right: 16px;
        }

        .answers {
          box-sizing: border-box;
          color: ${props => props.theme.colors.gray333};
          ${props => props.theme.fontStyle['body02-5']};
          .nickname-inner {
            padding-top: 20px;
            .line {
              display: inline-block;
              width: 2px;
              height: 14px;
              margin: 0 8px;
              background-color: ${props => props.theme.colors.gray666};
            }
          }
          p {
            max-width: 970px;
            word-wrap: break-word;
          }
        }
      }
    }
  }

  .update-inner {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin: 16px 0;
    padding: 0 32px;
    .ButtonLink {
      width: 60px;
      height: 36px;
      line-height: 36px;
      border: 1px solid ${props => props.theme.colors.grayada};
      background-color: ${props => props.theme.colors.white};
      cursor: pointer;
      a {
        width: 100%;
        height: 100%;
        line-height: inherit;
        color: inherit;
      }
    }
  }
`;
