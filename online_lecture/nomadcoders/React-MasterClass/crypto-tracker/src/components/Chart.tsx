import { IHistorical } from "../types/Coin";
import ApexChart from "react-apexcharts";

type ChartProps = {
  coinId?: string;
  coinIdData?: IHistorical[];
};

function Chart({ coinId, coinIdData }: ChartProps) {
  return (
    <div>
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: coinIdData?.map((price) => price.close) || [],
          },
        ]}
        options={{
          theme: { mode: "dark" },
          chart: {
            width: 500,
            height: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
            categories: coinIdData?.map((price) => price.time_close),
          },
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["#0be881"], stops: [0, 10] },
          },
          colors: ["#0fbcf9"],
          tooltip: {
            y: {
              formatter: (value) => `$${value.toFixed(2)}`,
            },
          },
        }}
      />
    </div>
  );
}

export default Chart;
