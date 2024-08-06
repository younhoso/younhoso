'use client';

import styled from 'styled-components';

export const CardReviewStyled = styled.div`
  min-width: 1280px;
  width: 100%;
  min-height: 417px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &::before {
    content: '';
    min-width: 1280px;
    width: 100%;
    height: 417px;
    display: block;
    background-color: #e7eefa;
    position: absolute;
    left: 0;
    right: 0;
  }

  .swiper {
    width: 100%;
    margin: unset;

    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
      opacity: 0;
    }
  }

  .cardReview-inner {
    border-radius: 16px;
    padding: 32px 14px;
    background-color: ${props => props.theme.colors.white};
    position: relative;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    .cardReview-description-inner {
      > img {
        margin-bottom: 16px;
      }
      > p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: ${props => props.theme.colors.gray333};
        ${props => props.theme.fontStyle['body03-3']}

        &.cart-review-content {
          min-height: 69px;
          ${props => props.theme.fontStyle['body02-5']}
          color: ${props => props.theme.colors.gray333};
        }
      }
      .StarRating {
        margin-top: 16px;
        margin-bottom: 8px;
      }
    }
    > img {
      flex: 0.25;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .card-review-wrapper {
    position: relative;
    width: 100%;
  }

  .arrow-wrapper {
    padding: 12px 10px 12px 14px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);

    background-color: white;
    z-index: 2;
    cursor: pointer;

    &.absolute-left {
      padding: 12px 14px 12px 10px;
      left: -26px;
      position: absolute;
      top: 140px;
    }
    &.absolute-right {
      right: -26px;
      position: absolute;
      top: 140px;
    }
  }

  .img-inner {
    padding: 32px 8px;
  }
`;
