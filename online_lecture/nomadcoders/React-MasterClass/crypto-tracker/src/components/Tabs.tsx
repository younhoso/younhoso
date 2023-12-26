import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import useTabs from "../hook/useTabs";

function Tabs() {
  const { activeTab, handleTabChange } = useTabs("chart");

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
          Tab1
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
          Tab2
        </button>
      </div>

      <div>
        {activeTab === "chart" && <Chart />}
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.accentColor};
  .tabs {
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  a {
    display: block;
  }
`;

export default Tabs;
