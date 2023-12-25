import { useLocation } from "react-router-dom";
import styled from "styled-components";

function Coin() {
  const { state } = useLocation();

  return (
    <div>
      <Container>
        <Header>
          <Title>{state?.name || "Loading..."}</Title>
        </Header>
      </Container>
    </div>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.colors.accentColor};
`;

export default Coin;
