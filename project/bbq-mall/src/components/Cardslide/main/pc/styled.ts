'use client';

import styled from 'styled-components';

export const CardslideStyled = styled.div`
  min-width: 1280px;
  position: relative;
  display: flex;
  grid-gap: 16px;
  row-gap: 80px;
  justify-items: center;
  align-items: start;
  margin: 80px 0 80px 0;
  &.main-list {
    margin: 60px 0 80px 0;
  }
  &.categories-list {
    margin: 40px 0 60px 0;
  }
  .sections-description {
    width: 150px;
  }

  > div:first-child {
    &::before {
      content: '';
      display: block;
      width: 20px;
      height: 4px;
      background-color: #000;
      margin-bottom: 16px;
    }
  }

  .swiper {
    width: 80%;
    margin-right: 0;
    min-height: 460px;
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
      top: 25.5%;
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
      top: 25.5%;
      &::after {
        font-size: ${props => props.theme.fontSizes.font22};
        font-weight: ${props => props.theme.fontWeight.extraBold};
      }
    }
    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
      opacity: 0;
    }
  }

  .all-view-inner {
    cursor: pointer;
    border: 1px solid ${props => props.theme.colors.gray5f5};
    a {
      height: 243px;
      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      > p {
        ${props => props.theme.fontStyle['body02-3']};
        color: ${props => props.theme.colors.gray333};
      }
    }
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
      left: 226px;
      position: absolute;
      top: 93px;
    }
    &.absolute-right {
      right: -30px;
      position: absolute;
      top: 93px;
    }
  }
`;
