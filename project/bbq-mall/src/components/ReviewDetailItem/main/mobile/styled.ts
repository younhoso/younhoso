'use client';

import styled from 'styled-components';

export const ReviewDetailItemMobileStyled = styled.div`
  padding: 20px 0;
  border-top: 1px solid ${props => props.theme.colors.grayada};
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }

  .StarRating {
    margin-top: 10px;
    height: 24px;
  }

  .image-fileUrls {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
    margin-top: 24px;
  }

  > img {
    margin-right: 8px;
  }
  .line {
    width: 1px;
    height: 10px;
    background-color: ${props => props.theme.colors.gray999};
    display: inline-block;
    margin: 0 7px 0 5px;
  }
  .option-name {
    ${props => props.theme.fontStyle['body03-3']};
    color: ${props => props.theme.colors.gray666};
    margin-top: 12px;
  }

  .review-thumbnail-inner {
    position: relative;
    .review-thumbnail-image {
      cursor: pointer;
      position: relative;
    }
    .review-thumbnail-count {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 4px;
      right: 0px;
      color: ${props => props.theme.colors.white};
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      font-weight: 500;
    }
  }

  .content {
    color: ${props => props.theme.colors.gray333};
    font-size: 15px;
    font-weight: 500;
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

  .change-open-button {
    display: flex;
    align-items: center;
    margin-top: 18px;
    cursor: pointer;
    color: ${props => props.theme.colors.gray333};
    font-size: 14px;
    font-weight: 500;

    .arrow-wrapper {
      width: 18px;
      height: 18px;
      border: 1px solid ${props => props.theme.colors.graybbb};
      border-radius: 50%;
      text-align: center;
      margin-left: 8px;
    }
  }
`;
