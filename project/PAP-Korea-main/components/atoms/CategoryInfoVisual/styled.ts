import styled from 'styled-components';

export const CategoryInfoVisualStyled = styled.div`
  display: flex;
  align-items: center;
  height: 56.25rem;

  & img {
    height: 100%;
    width: 50%;
    object-fit: cover;
  }
  & > div {
    height: 100%;
    width: 50%;

    &.gradientBG {
      padding: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-transform: uppercase;

      & h3 {
        font-size: 3.5rem;
        letter-spacing: 10px;
        font-family: Montserrat;
        /* font-family: Mada; */
        text-align: center;
      }

      & p {
        letter-spacing: 3px;
        font-size: 0.85rem;
      }
    }
  }
`;
