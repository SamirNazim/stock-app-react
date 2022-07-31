import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const TickerPieChart = (props) => {
  const { user } = props;

  var tickerBySectorMap = new Map();
  let sum = 0;

  //Creates map that categorizes users stock portfolio by sector. Mapping enables us to remove duplicates so the pie chart only has unique sectors.
  const createMapObject = async () => {
    user?.data?.map((tickerData) => {
      if (!tickerBySectorMap.has(tickerData.sector)) {
        tickerBySectorMap.set(
          tickerData.sector,
          tickerData.avgprice * tickerData.qty
        );
      } else {
        tickerBySectorMap.set(
          tickerData.sector,
          tickerBySectorMap.get(tickerData.sector) +
            tickerData.avgprice * tickerData.qty
        );
      }

      sum += tickerData.avgprice * tickerData.qty;
    });
  };

  //Could possibly use useEffect instead of calling function directly
  createMapObject();

  const data = {
    labels: [...tickerBySectorMap.keys()],

    datasets: [
      {
        label: "$ of Total Portfolio",
        data: [...tickerBySectorMap.values()],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
      {
        label: "% of Total Portfolio",
        data: [...tickerBySectorMap.values()].map((total) => {
          return ((total / sum) * 100).toFixed(2);
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };
  return (
    <div style={{ width: "30vw" }}>
      <Pie data={data} />
    </div>
  );
};

export default TickerPieChart;
