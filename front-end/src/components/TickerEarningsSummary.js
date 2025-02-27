import React, { useEffect, useState } from "react";
import { Bubble } from "react-chartjs-2";
import { getTicker } from "../axios/getTickerData.js";
import { 
  Chart as ChartJS, 
  LinearScale,
  PointElement,
  Tooltip, 
  Legend,
  Title,
  ArcElement,
  ScatterController,
  BubbleController
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  ScatterController,
  BubbleController
);

const TickerEarningsSummary = (props) => {
  const [earnings, setEarnings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { ticker } = props;

  // Get stock ticker data
  useEffect(() => {
    setIsLoading(true);
    getTicker(ticker)
      .then((data) => {
        setEarnings(data?.data?.earnings?.earningsChart?.quarterly || []);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching earnings data:", err);
        setIsLoading(false);
      });
  }, [ticker]);

  const options = {
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          // Calculate X axis EPS difference (i.e. BEAT or MISS by $x.xx)
          callback: function (value, idx = 0, ticks) {
            if (!earnings[idx]) return value;
            
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
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (isLoading) {
    return <div>Loading earnings data...</div>;
  }

  if (earnings.length === 0) {
    return <div>No earnings data available for {ticker}.</div>;
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Bubble options={options} data={data} />
    </div>
  );
};

export default TickerEarningsSummary;