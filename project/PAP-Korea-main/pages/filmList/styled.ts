import styled from "styled-components";
import { numberToRem } from "~/utils/rem";

const FilmStyled = styled.div`
 @media (max-width: 500px) {
  }

  & .toastui-editor-contents {
    max-width: 1200px;
    margin: 5rem auto;
  }


  > .emptyTop {
    height : ${numberToRem(80, 1)};
  }

`;

export default FilmStyled;
