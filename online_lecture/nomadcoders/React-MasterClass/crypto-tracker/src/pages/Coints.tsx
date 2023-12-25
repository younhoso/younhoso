import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CoinType } from "../Types/Coin";

function Coins() {
  const [coins, setCoins] = useState<CoinType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await res.json();
      setCoins(json.slice(0, 100));
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{ name: coin.name }}>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
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
const CoinsList = styled.ul``;

const Coin = styled.li`
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.bgColor};
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.colors.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.colors.accentColor};
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

export default Coins;
