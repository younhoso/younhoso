import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import useTabs from "../hook/useTabs";
import { useParams } from "react-router-dom";
import { IHistorical, RouteParams } from "../types/Coin";

type TabsProps = {
  coinIdData?: IHistorical[];
};

function Tabs({ coinIdData }: TabsProps) {
  const { activeTab, handleTabChange } = useTabs("chart");
  const { coinId } = useParams<RouteParams>();

  return (
    <TabStyle>
      <div className="tabs">
        <button
          onClick={() =>
            handleTabChange({
              queryKey: "search",
              queryValue: "chart",
            })
          }
          className={activeTab === "chart" ? "active" : ""}
        >
          CHART
        </button>
        <button
          onClick={() =>
            handleTabChange({
              queryKey: "search",
              queryValue: "price",
            })
          }
          className={activeTab === "price" ? "active" : ""}
        >
          PRICE
        </button>
      </div>

      <div>
        {activeTab === "chart" && (
          <Chart coinId={coinId} coinIdData={coinIdData} />
        )}
        {activeTab === "price" && <Price />}
      </div>
    </TabStyle>
  );
}

const TabStyle = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;

  .tabs {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  a {
    display: block;
  }
`;

export default Tabs;
