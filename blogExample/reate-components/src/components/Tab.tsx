import styled from "styled-components";
import useTabs from "../hook/useTabs";

function Chart() {
  return <h1>Chart</h1>;
}

function Price() {
  return <h1>Price</h1>;
}

function Tab() {
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

export default Tab;
