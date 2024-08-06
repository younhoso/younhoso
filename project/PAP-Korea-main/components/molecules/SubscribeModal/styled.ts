import styled from 'styled-components';

export const SubscribeModalStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(100, 100, 100, 0.7);
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;

  & .contents {
    width: 50rem;
    height: 30rem;
    overflow: hidden;
    background-color: black;
    position: relative;

    & .Img {
      width: 100%;
      height: 100%;
      opacity: 0.7;
    }

    & > .content {
      position: absolute;
      padding: 1rem 1rem 5rem 1rem;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & .closeControls {
        display: flex;
        align-items: center;
        line-height: 1;

        & .closeBtn {
          margin-right: 1rem;
        }

        & .todayNoShow {
          display: flex;
          align-items: center;
        }

        & .checkbox {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 5px;
          border: 1px solid white;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          & .check {
            width: 0.75rem;
            height: 0.75rem;
            background: white;
            border-radius: 2px;
            transition: 0.3s all;
            opacity: 0;
            transform: scale(0.5);

            &.checked {
              opacity: 1;
              transform: scale(1);
            }
          }
        }
      }

      & .comment {
        text-align: center;

        & h1 {
          font-size: 5rem;
          line-height: 1;
        }

        & p {
          font-size: 1.5rem;
        }
      }

      & .subseribe {
        display: flex;
        align-items: center;
        justify-content: center;

        & > div {
          width: 20rem;
          height: 3rem;
          border-radius: 25px;
          position: relative;
          background: rgba(255, 255, 255, 0.3);
          overflow: hidden;
          border: 3px solid white;
          transition: 0.5s all;

          & button {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 0;
            top: 0;
            border: none;
            width: 100%;
            height: 100%;
            font-size: 1.75rem;
            cursor: pointer;
            border-radius: 25px;
          }

          &:hover {
            background: rgba(255, 255, 255, 1);
            color: black;
          }
        }
      }
    }
  }
`;
