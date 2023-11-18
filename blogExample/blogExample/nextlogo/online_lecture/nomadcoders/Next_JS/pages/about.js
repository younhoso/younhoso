import styled from "styled-components";
import Seo from "../components/Seo";

function Potato() {
  return (
    <PotatoWraper>
      <Seo title="About" />
      <h1>About</h1>
    </PotatoWraper>
  );
}

const PotatoWraper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

export default Potato;

