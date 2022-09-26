import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string
}

interface IHistorical {
  time_open:  string;
  time_close: string;
  open:       number;
  high:       number;
  low:        number;
  close:      number;
  volume:     number;
  market_cap: number;
}

function Chart({coinId}: ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId], () => fetchCoinHistory(coinId)
  );
  return <div>{isLoading ? (
      "Loading chart..."
    ) : (
      // @ts-ignore
      <ApexChart 
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price) => price.close) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            width: 500,
            height: 300,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          stroke : {
            curve: "smooth",
            width: 4,
          },
          grid: { show: true }, 
          yaxis: {
            show: true,
          },
          xaxis: {
            axisBorder: { show: true },
            axisTicks: { show: true },
            labels: { show: true },
          },
        }}
      />
    )}</div>;
}

export default Chart;