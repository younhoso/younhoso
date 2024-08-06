'use client';

import styled from 'styled-components';

export const HeaderStyled = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  height: 156px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  z-index: 99;
  margin-bottom: 60px;
  min-width: ${props => props.theme.sizes.maxPcWidth};

  .header-wrapper {
    max-width: ${props => props.theme.sizes.maxPcWidth};

    margin: 0 auto;

    .header-top {
      color: ${props => props.theme.colors.gray333};
      height: 36px;
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 8px;

      > div {
        display: flex;
        align-items: center;

        > span {
          ${props => props.theme.fontStyle['body04-2']};
          font-size: 13px;
        }

        > span,
        img {
          cursor: pointer;
        }

        &.sign-up {
          color: ${props => props.theme.colors.red937};
        }

        &:not(:last-child) {
          gap: 8px;
          &:after {
            content: '';
            border-right: 1.5px solid ${props => props.theme.colors.gray333};
            height: 10px;
          }
        }

        &.my-wrapper {
          display: flex;
          align-items: center;
          .grade {
            display: flex;
            align-items: center;
            gap: 1px;
            height: 15px;
            border-radius: 16px;
            padding: 9px 7px 10px 2px;
            font-size: 9px;
            font-weight: 700;
          }

          .my-wrapper-name {
            position: relative;
            .my-label {
              cursor: pointer;
              display: flex;
              align-items: center;
              ${props => props.theme.fontStyle['body04-2']}
              font-size: 13px;
              > span,
              img {
                cursor: pointer;
              }
              > span {
                ${props => props.theme.fontStyle['body04-1']}
                font-size: 13px;
              }
            }

            .my-wrapper-dropdown {
              white-space: nowrap;
              display: flex;
              gap: 8px;
              flex-direction: column;
              position: absolute;
              top: 25px;
              right: 0;
              padding: 16px;
              background-color: white;
              border: 1px solid ${props => props.theme.colors.grayada};
              > div {
                cursor: pointer;
                ${props => props.theme.fontStyle['body03-3']};
                color: ${props => props.theme.colors.gray666};
              }
            }
          }
        }

        &.inquiry {
          position: relative;

          .inquiry-label {
            display: flex;
            align-items: center;
            ${props => props.theme.fontStyle['body04-2']}
            font-size: 13px;
            cursor: pointer;
          }

          .inquiry-dropdown {
            z-index: 1;
            white-space: nowrap;
            display: flex;
            gap: 8px;
            flex-direction: column;
            position: absolute;
            top: 25px;
            right: 0;
            padding: 16px;
            background-color: white;
            border: 1px solid ${props => props.theme.colors.grayada};
            > div {
              ${props => props.theme.fontStyle['body03-3']};
              color: ${props => props.theme.colors.gray666};
              cursor: pointer;
            }
          }
        }
      }
    }

    .header-middle {
      height: 64px;
      align-items: center;
      display: flex;

      .logo {
        cursor: pointer;
        margin-right: 39px;
      }

      .HeaderToggle {
        margin-right: 56px;
      }

      .search-wrapper {
        flex: 1 0 auto;
        .Search {
          max-width: 615px;
        }
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: end;
        > img {
          cursor: pointer;
        }
      }

      .favorite-icon {
        margin-right: 16px;
      }

      > img {
        cursor: pointer;
      }
    }
  }
  .header-bottom {
    height: 56px;
    display: flex;
    align-items: center;
    .category-item {
      flex: 1;
      color: ${props => props.theme.colors.gray333};
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;

      .hamburger {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .detail-dropdown {
    position: absolute;
    z-index: 100;
    max-width: 100%;
    top: 156px;
    left: 0;
    width: 100vw;
    background-color: white;
    min-height: 345px;
    border-top: 1px solid ${props => props.theme.colors.grayada};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    .dropdown-wrapper {
      max-width: ${props => props.theme.sizes.maxPcWidth};
      margin: 32px auto;
      display: flex;
      justify-content: space-between;

      .dropdown-item {
        .dropdown-item-title {
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 24px;
          color: ${props => props.theme.colors.gray333};
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dropdown-item-children {
          display: flex;
          flex-direction: column;
          gap: 16px;

          .dropdown-item-children-title {
            color: ${props => props.theme.colors.gray666};
            cursor: pointer;
            ${props => props.theme.fontStyle['body02-5']}

            &:hover {
              ${props => props.theme.fontStyle['body02-4']}
            }
          }
        }

        .dropdown-item-description {
          max-width: 160px;
          margin-top: 12px;
          ${props => props.theme.fontStyle['body02-5']};
          color: ${props => props.theme.colors.gray333};
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &.recent-view {
          cursor: pointer;
        }

        .recent-view-no-item {
          width: 160px;
          ${props => props.theme.fontStyle['body03-3']};
          color: ${props => props.theme.colors.gray666};
        }
      }
    }
  }
`;
