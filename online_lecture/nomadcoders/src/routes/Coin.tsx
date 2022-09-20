import React, { useState } from 'react'
import styled from 'styled-components';
import { useLocation, useParams } from "react-router";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`

interface RouteParams {
  coinId: string;
}

interface RouteSate {
  name: string;
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const {state} = useLocation<RouteSate>();
  return <Container>
          <Header>
            <Title>{state?.name || "Loading..."}</Title>
          </Header>
          {loading ? <Loader> Loading... </Loader>  : null }
        </Container>;
}
export default Coin;
