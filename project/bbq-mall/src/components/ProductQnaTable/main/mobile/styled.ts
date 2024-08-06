'use client';

import styled from 'styled-components';

export const ProductQnaTableMobileStyled = styled.div`
  .qna-info-inner {
    padding-bottom: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    margin: 24px 0;
    .qna-info-left {
      flex: 0.7;
    }
    .qna-info-right {
      flex: 0.3;
    }
    .qna-title {
      max-width: 220px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      color: ${props => props.theme.colors.gray999};
      ${props => props.theme.fontStyle['body03-3']};
    }
    .qna-item-info {
      .nickname-inner {
        .nickname-title-inner {
          display: flex;
          align-items: center;
          margin: 4px 0 6px 0;
        }
        .lock-text {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 30px;
        }
        .qna-content {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          padding-right: 5px;
          font-size: ${props => props.theme.fontSizes.font15};
          font-weight: ${props => props.theme.fontWeight.medium};
          line-height: 20px;
          color: ${props => props.theme.colors.gray333};
        }
        .qna-footer {
          display: flex;
          align-items: center;
          color: ${props => props.theme.colors.gray999};
          ${props => props.theme.fontStyle['body03-3']};
          .reply-wait {
            color: ${props => props.theme.colors.gray999};
          }
          .reply-completed {
            color: ${props => props.theme.colors.greena17};
          }
          .line {
            width: 2px;
            height: 12px;
            background-color: ${props => props.theme.colors.gray999};
            margin: 0 8px;
          }
          display: flex;
        }
      }
    }
  }

  .main-text {
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    padding-bottom: 20px;
    .question-inner {
      display: flex;
      gap: 10px;
      color: ${props => props.theme.colors.gray333};
      p {
        max-width: 305px;
        word-wrap: break-word;
        color: ${props => props.theme.colors.gray333};
        font-size: ${props => props.theme.fontSizes.font15};
        font-weight: ${props => props.theme.fontWeight.medium};
        line-height: 20px;
      }
    }
    .answers-inner {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px dashed ${props => props.theme.colors.grayada};
      .answer {
        display: flex;
        gap: 10px;
        color: ${props => props.theme.colors.gray333};
        font-size: ${props => props.theme.fontSizes.font15};
        font-weight: ${props => props.theme.fontWeight.medium};
        line-height: 20px;
        .nickname-inner {
          margin-top: 12px;
        }
      }
    }
  }

  .update-inner {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 16px;
    .ButtonLink {
      width: 60px;
      height: 36px;
      line-height: 36px;
      border: 1px solid ${props => props.theme.colors.grayada};
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.gray333};
      a {
        width: 100%;
        height: 100%;
        line-height: inherit;
        color: inherit;
      }
    }
  }
`;
