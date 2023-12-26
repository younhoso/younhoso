import {
  useLocation,
  useParams,
  Routes,
  Route,
  Link,
  useRoutes,
} from "react-router-dom";
import styled from "styled-components";
import { InfoData, PriceData, RouteParams } from "../types/Coin";
import { useQuery } from "@tanstack/react-query";
import Price from "../components/Price";
import Chart from "../components/Chart";
import Tab from "../components/Tabs";
import Tabs from "../components/Tabs";

const BASE_URL = "https://api.coinpaprika.com/v1";

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation();

  const { data: coinsInfo, isPending: coinsInfoIsLoding } = useQuery<InfoData>({
    queryKey: [`${BASE_URL}/coins/${coinId}`],
    queryFn: async ({ queryKey: [key] }) => {
      const respons = await fetch(key as string);
      return respons.json();
    },
  });

  const { data: tickersData, isPending: tickersLoading } = useQuery<PriceData>({
    queryKey: [`${BASE_URL}/tickers/${coinId}`],
    queryFn: async ({ queryKey: [key] }) => {
      const respons = await fetch(key as string);
      return respons.json();
    },
  });

  const loading = coinsInfoIsLoding || tickersLoading;

  return (
    <div>
      <Container>
        <Header>
          <Title>
            {state?.name
              ? state.name
              : coinsInfoIsLoding
              ? "Loading..."
              : coinsInfo?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{coinsInfo?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${coinsInfo?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Open Source:</span>
                <span>{coinsInfo?.open_source ? "Yes" : "No"}</span>
              </OverviewItem>
            </Overview>
            <Description>{coinsInfo?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs />
          </>
        )}
      </Container>
    </div>
  );
}

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

export default Coin;
