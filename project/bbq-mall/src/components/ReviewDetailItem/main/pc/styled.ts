'use client';

import styled from 'styled-components';

export const ReviewDetailItemStyled = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  padding: 24px 0;

  .review-img-inner {
    display: flex;
    justify-content: space-between;
    > div {
      span {
        padding-left: 5px;
        color: ${props => props.theme.colors.gray999};
      }
    }

    .review-thumbnail-inner {
      position: relative;
      .review-thumbnail-image {
        cursor: pointer;
        position: relative;
      }
      .review-thumbnail-count {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 76px;
        right: 0px;
        color: ${props => props.theme.colors.white};
        ${props => props.theme.fontStyle['body02-4']}
        background-color: rgba(0, 0, 0, 0.5);
      }
    }

    .StarRating {
      margin-top: 10px;
    }
    .option-name {
      padding: 16px 0;
      color: ${props => props.theme.colors.gray666};
      ${props => props.theme.fontStyle['body03-3']}
    }
    .content {
      max-width: 1160px;
      ${props => props.theme.fontStyle['body02-5']}
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: keep-all;
      &.active {
        display: block;
      }
    }
  }

  .image-fileUrls {
    display: flex;
    gap: 8px;
    margin-top: 26px;
  }

  .change-open-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 24px;
    .arrow-wrapper {
      width: 18px;
      height: 18px;
      border: 1px solid ${props => props.theme.colors.graybbb};
      border-radius: 50%;
      text-align: center;
      margin-left: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  > img {
    margin-right: 8px;
  }
  .line {
    width: 2px;
    height: 13px;
    background-color: ${props => props.theme.colors.gray999};
    display: inline-block;
    margin: 0 5px 0 5px;
  }
`;
