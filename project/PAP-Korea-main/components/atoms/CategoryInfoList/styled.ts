import styled from 'styled-components';

export const CategoryInfoListStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10rem 25% 0 25%;
  flex-wrap: wrap;

  & > div {
    width: calc(50% - 2rem);

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.item {
      position: relative;
      transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
      margin: 1rem;
      /* margin-left: 2rem;  */
      overflow: hidden;

      & .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translate(0%, 30%);
        opacity: 0;
        padding: 2rem;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        color: white;
        transition: 0.5s all cubic-bezier(0.27, 0.78, 0.25, 0.93);
        cursor: pointer;

        & > div {
          overflow-y: auto;
          max-height: 100%;
          max-width: 100%;

          & .group {
            display: flex;
            padding: 0.05rem 0;
            font-size: 0.9rem;
            & p {
              min-width: 6.5rem;
              max-width: 7rem;
            }
            & .item {
              margin-left: .5rem;
              display: flex;
              flex-wrap: wrap;
              a {
                word-break: break-all;
              }
            }
          }
        }
      }

      &:hover {
        & .content {
          transform: translate(0%, 0%);
          opacity: 1;
        }
      }
    }
  }
`;
