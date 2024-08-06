'use client';

import styled from 'styled-components';

export const CardReviewMobileStyled = styled.div`
  background-color: #e7eefa;
  .swiper {
    width: 100%;
    margin: unset;
    padding: 50px 0 72px 20px;

    .swiper-scrollbar {
      max-width: 330px;
    }
    .swiper-slide {
      max-width: 156px;
      width: 60%;
    }

    .swiper-button-prev {
      width: auto;
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.gray333};
      width: 60px;
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 50%;
      box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.5);
      left: 16px;
      &::after {
        font-size: ${props => props.theme.fontSizes.font22};
        font-weight: ${props => props.theme.fontWeight.extraBold};
      }
    }
    .swiper-button-next {
      width: auto;
      background-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.gray333};
      width: 60px;
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 50%;
      box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.5);
      right: 16px;
      &::after {
        font-size: ${props => props.theme.fontSizes.font22};
        font-weight: ${props => props.theme.fontWeight.extraBold};
      }
    }
    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
      opacity: 0;
    }
    .swiper-pagination-bullet-active {
      background-color: ${props => props.theme.colors.gray333};
    }
    .swiper-pagination-horizontal {
      bottom: var(--swiper-pagination-bottom, 34px);
    }
  }

  .cardReview-inner {
    border-radius: 1em;
    padding: 24px 16px;
    background-color: ${props => props.theme.colors.white};
    position: relative;
    box-shadow: 0px 14px 24px hsla(218, 53%, 10%, 12%);

    .cardReview-description-inner {
      ${props => props.theme.fontStyle['body03-3']}
      img {
        margin-bottom: 8px;
      }

      > p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: ${props => props.theme.colors.gray333};
        font-size: ${props => props.theme.fontSizes.font13};

        &:nth-of-type(2) {
          margin-bottom: 2px;
        }

        &.cart-review-content {
          height: 54px;
          ${props => props.theme.fontStyle['body03-3']}
          color: ${props => props.theme.colors.gray333};
        }
      }
      .StarRating {
        margin-top: 10px;
      }
    }
    > img {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      flex: 0.25;
      border-radius: 50%;
    }
  }
`;
