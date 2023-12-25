import styled from "styled-components";

function Coins() {
  return <div>Coins</div>;
}

const CoinsList = styled.ul``;
const Coin = styled.li``;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.black};
`;

export default Coins;
