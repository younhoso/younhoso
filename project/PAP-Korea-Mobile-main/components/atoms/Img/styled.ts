import styled from 'styled-components';

export const ImgStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  > div {
    width: 100%;
    height: 100%;
    position: relative;
  }

  span {
    width: 100% !important;
    height: 100% !important;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
