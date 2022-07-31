import React, { useEffect, useState } from "react";
import { Bubble } from "react-chartjs-2";
import { getTicker } from "../axios/getTickerData.js";

const TickerEarningsSummary = (props) => {
  const [earnings, setEarnings] = useState([]);
  const { ticker } = props;

  //Get stock ticker data
  useEffect(() => {
    getTicker(ticker).then((data) => {
      setEarnings(data?.data?.earnings?.earningsChart?.quarterly);
    });
  }, []);

  const options = {
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          //Calculate X axis EPS difference (i.e. BEAT or MISS by $x.xx)
          callback: function (value, idx = 0, ticks) {
            let difference = earnings[idx]?.actual - earnings[idx]?.estimate;

            return (
              earnings[idx]?.date +
              (difference > 0 ? " Beat " : " Miss ") +
              " $" +
              difference.toFixed(2) +
              " "
            );
          },
          stepSize: 1,
        },
        offset: true,
        min: 1,
      },
      y: {
        ticks: {
          stepSize: 0.1,
        },
        offset: true,
      },
    },
  };
  const data = {
    datasets: [
      {
        label: "Estimate Earnings",
        data: earnings.map((d, idx) => ({ x: idx + 1, y: d.estimate, r: 9 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Actual Earnings",
        data: earnings.map((d, idx) => ({ x: idx + 1, y: d.actual, r: 9 })),
        backgroundColor: "rgba(123, 32, 1, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "1000px", width: "1000px" }}>
      <Bubble options={options} data={data} />
    </div>
  );
};

export default TickerEarningsSummary;
