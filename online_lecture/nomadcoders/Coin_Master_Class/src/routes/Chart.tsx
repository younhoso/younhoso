import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
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
  const isDark = useRecoilValue(isDarkAtom);

  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 10000}
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
            mode: isDark ? "dark" : "light",
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
            type: "datetime",
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            categories: data?.map((price) => price.time_close)
          },
          fill: {
            type: "gradient",
            gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}
          },
          colors: ["#0fbcf9"],
          tooltip: {
            y: {
              formatter: (value) => `${value.toFixed(2)}`
            }
          }
        }}
      />
    )}</div>;
}

export default Chart;